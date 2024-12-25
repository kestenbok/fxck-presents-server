import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../user/current-user.decorator';
import type { User } from '../user/entities/user.entity';
import type { AnswerFriendRequestDto } from './dto/answer-friend-request.dto';
import type { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendshipService: FriendsService) {}

  @Get()
  async listUserFriends(@CurrentUser() user: User) {
    return this.friendshipService.listFriendsForUser(user.id);
  }

  @Get('/requests')
  async listFriendRequests(@CurrentUser() user: User) {
    return this.friendshipService.listRequestsForUser(user.id);
  }

  @Post('/requests/answer/:id')
  async answerRequest(
    @Param('id') requestId: number,
    @Body() { accept }: AnswerFriendRequestDto,
    @CurrentUser() user: User,
  ) {
    const request =
      await this.friendshipService.getFriendRequestById(requestId);

    if (request.recipient.id !== user.id) {
      throw new BadRequestException();
    }

    return this.friendshipService.answerFriendRequest(
      request.sender.id,
      request.recipient.id,
      request.id,
      accept,
    );
  }

  @Post('/requests/send/:userId')
  async sendFriendRequest(
    @Param('userId') userId: number,
    @CurrentUser() user: User,
  ) {
    return this.friendshipService.sendFriendRequest(userId, user.id);
  }
}
