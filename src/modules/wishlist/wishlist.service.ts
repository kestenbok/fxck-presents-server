import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Wishlist } from './entities/wishlist.entity';
import { ItemAlreadyReservedException } from './errors/item-already-reserved.error';
import { WishlistDoesNotExistException } from './errors/wishlist-does-not-exist.error';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,

    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,
  ) {}

  async create(dto: CreateWishlistDto, creator: User) {
    const items = dto.items.map((item) => new WishlistItem(item));
    dto.items = items;

    const list = new Wishlist({
      name: dto.name,
      dueDate: new Date(dto.dueDate),
      creator,
      items,
    });

    return this.wishlistRepository.save(list);
  }

  async update(id: number, dto: CreateWishlistDto) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });

    if (!wishlist) {
      throw new WishlistDoesNotExistException();
    }

    return await this.wishlistRepository.save({
      ...wishlist,
      name: dto.name,
      dueDate: dto.dueDate,
      items: dto.items,
      // @todo: these should only be friends of the user
      participants: dto.participantIds.map((id) => ({ id })),
    });
  }

  async getById(id: number) {
    return this.wishlistRepository.findOne({
      where: { id },
      relations: { items: true, participants: true, creator: true },
    });
  }

  async listByUserId(userId: number) {
    return this.wishlistRepository.findBy({ creator: { id: userId } });
  }

  async listByParticipantId(participantId: number) {
    return this.wishlistRepository.findBy({
      participants: { id: participantId },
    });
  }

  async remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }

  async toggleItemReserved(
    wishlist: Wishlist,
    itemId: number,
    reservedBy: User,
  ) {
    const item = wishlist.items.find((item) => item.id === itemId);

    if (!item) {
      throw new NotFoundException();
    }

    if (!item.reservedBy) {
      item.reservedBy = reservedBy;

      return this.wishlistItemRepository.save(item);
    }

    if (item.reservedBy.id === reservedBy.id) {
      item.reservedBy = null;

      return this.wishlistItemRepository.save(item);
    }

    throw new ItemAlreadyReservedException();
  }

  async canUserMutate(userId: number, wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: { creator: true },
    });

    return wishlist.creator.id === userId;
  }

  async canUserAccess(userId: number, wishlist: Wishlist) {
    const isOwner = wishlist.creator.id === userId;
    const isParticipant = wishlist.participants.some(
      (participant) => participant.id === userId,
    );

    return isOwner || isParticipant;
  }
}
