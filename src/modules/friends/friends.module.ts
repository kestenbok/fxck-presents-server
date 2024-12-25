import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipRequest } from './entities/friendship-request.entity';
import { Friendship } from './entities/friendship.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friendship, FriendshipRequest])],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
