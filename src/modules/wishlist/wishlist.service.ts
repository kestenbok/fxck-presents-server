import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistItem } from './entities/wishlist-item.entity';
import { User } from '../user/entities/user.entity';
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
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });

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
      relations: { items: true, participants: true },
    });
  }

  async listByUserId(userId: number) {
    return this.wishlistRepository.findBy({ creator: { id: userId } });
  }

  async remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }

  async canUserMutate(userId: number, wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: { creator: true },
    });

    return wishlist.creator.id === userId;
  }
}
