import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from 'src/core/database/entity/base.entity';
import { Wishlist } from '../wishlist/entities/wishlist.entity';

@Entity()
export class User extends BaseEntity<User> {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.creator)
  wishlists: Wishlist[];
}
