import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistItem } from './entities/wishlist-item.entity';
import { User } from '../user/user.entity';
import { WishlistDoesNotExistException } from './errors/wishlist-does-not-exist.error';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
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
    const items = dto.items.map((item) => new WishlistItem(item));
    const wishlist = await this.wishlistRepository.findOneBy({ id });

    if (!wishlist) {
      throw new WishlistDoesNotExistException();
    }

    wishlist.name = dto.name;
    wishlist.dueDate = new Date(dto.dueDate);
    wishlist.items = items;

    return this.wishlistRepository.save(wishlist);
  }

  async getById(id: number) {
    return this.wishlistRepository.findOne({
      where: { id },
      relations: { items: true },
    });
  }

  async listByUserId(userId: number) {
    return this.wishlistRepository.findBy({ creator: { id: userId } });
  }

  async remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }

  async userCanMutate(userId: number, wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: { creator: true },
    });

    return wishlist.creator.id === userId;
  }
}
