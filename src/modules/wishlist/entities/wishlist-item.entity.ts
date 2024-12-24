import { Column, Entity, ManyToOne } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { BaseEntity } from 'src/core/database/entity/base.entity';

@Entity()
export class WishlistItem extends BaseEntity<WishlistItem> {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Wishlist, (list) => list.items, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  wishlist: Wishlist;
}