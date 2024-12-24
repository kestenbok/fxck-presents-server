import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/database/entity/base.entity';
import { WishlistItem } from './wishlist-item.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Wishlist extends BaseEntity<Wishlist> {
  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.wishlists)
  creator: User;

  @OneToMany(() => WishlistItem, (item) => item.wishlist, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  items: WishlistItem[];
}
