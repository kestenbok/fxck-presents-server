import { BaseEntity } from 'src/core/database/entity/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Entity()
export class WishlistItem extends BaseEntity<WishlistItem> {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(
    () => Wishlist,
    (list) => list.items,
    {
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
    },
  )
  wishlist: Wishlist;

  @ManyToOne(() => User, { eager: true })
  reservedBy: User;
}
