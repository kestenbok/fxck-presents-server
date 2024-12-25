import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/core/database/entity/base.entity';
import { FriendshipRequest } from 'src/modules/friends/entities/friendship-request.entity';
import { Friendship } from '../../friends/entities/friendship.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';

@Entity()
export class User extends BaseEntity<User> {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @OneToMany(
    () => Wishlist,
    (wishlist) => wishlist.creator,
  )
  ownWishlists: Wishlist[];

  @ManyToMany(
    () => Wishlist,
    (wishlist) => wishlist.participants,
  )
  friendsWishlists: Wishlist[];

  @OneToMany(
    () => Friendship,
    (friendship) => friendship.userA,
  )
  friends: Friendship[];

  @OneToMany(
    () => FriendshipRequest,
    (request) => request.recipient,
  )
  friendRequests: FriendshipRequest[];
}
