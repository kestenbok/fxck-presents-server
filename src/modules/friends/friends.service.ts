import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { FriendshipRequest } from './entities/friendship-request.entity';
import { Friendship } from './entities/friendship.entity';
import { AlreadyFriendsException } from './errors/already-friends.error';
import { RequestPendingException } from './errors/request-pending.error';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendshipRequest)
    private readonly friendRequestRepository: Repository<FriendshipRequest>,
    @InjectRepository(Friendship)
    private readonly friendshipRepository: Repository<Friendship>,
  ) {}

  async getFriendRequestById(id: number) {
    return this.friendRequestRepository.findOne({
      where: { id },
      relations: { sender: true, recipient: true },
    });
  }

  async sendFriendRequest(fromId: number, toId: number) {
    if (await this.areFriends(fromId, toId)) {
      throw new AlreadyFriendsException();
    }

    if (await this.isRequestPending(fromId, toId)) {
      throw new RequestPendingException();
    }

    const request = this.friendRequestRepository.create({
      sender: { id: fromId },
      recipient: { id: toId },
    });

    await this.friendRequestRepository.insert(request);
  }

  async answerFriendRequest(
    fromId: number,
    toId: number,
    requestId: number,
    accept: boolean,
  ) {
    if (!accept) {
      this.friendRequestRepository.delete({ id: requestId });
      return;
    }

    // @todo: Transaction
    const friendships = this.createFriendship(fromId, toId);
    this.friendshipRepository.save(friendships);
    this.friendRequestRepository.delete({ id: requestId });
  }

  async listFriendsForUser(userId: number) {
    const friendships = await this.friendshipRepository.find({
      where: { userA: { id: userId } },
      relations: { userB: true },
    });

    return friendships.map((friendship) => friendship.userB);
  }

  async listRequestsForUser(userId: number) {
    return this.friendRequestRepository.find({
      where: { recipient: { id: userId } },
      relations: { sender: true },
    });
  }

  private async areFriends(userAId: number, userBId: number) {
    return this.friendshipRepository.exists({
      where: { userA: { id: userAId }, userB: { id: userBId } },
    });
  }

  private isRequestPending(fromId: number, toId: number) {
    return this.friendRequestRepository.exists({
      where: { sender: { id: fromId }, recipient: { id: toId } },
    });
  }

  private createFriendship(userAId: number, userBId: number) {
    const friendshipA = this.friendshipRepository.create({
      userA: { id: userAId },
      userB: { id: userBId },
    });

    const friendshipB = this.friendshipRepository.create({
      userA: { id: userBId },
      userB: { id: userAId },
    });

    return [friendshipA, friendshipB];
  }
}
