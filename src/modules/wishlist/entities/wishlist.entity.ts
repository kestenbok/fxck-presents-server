import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/core/database/entity/base.entity';
import { WishlistItem } from './wishlist-item.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Wishlist extends BaseEntity<Wishlist> {
  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @JoinTable({ name: 'wishlist_participants' })
  @ManyToMany(() => User, (user) => user.friendsWishlists)
  participants: User[];

  @ManyToOne(() => User, (user) => user.ownWishlists)
  creator: User;

  @OneToMany(() => WishlistItem, (item) => item.wishlist, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  items: WishlistItem[];
}
