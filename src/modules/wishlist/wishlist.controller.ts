import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { OwnerCannotReserveItemException } from './errors/owner-cannot-reserve-item.error';
import { WishlistService } from './wishlist.service';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('/own')
  async listOwnWishlists(@CurrentUser() user: User) {
    return this.wishlistService.listByUserId(user.id);
  }

  @Get('/participating')
  async listParticipatingWishlists(@CurrentUser() user: User) {
    return this.wishlistService.listByParticipantId(user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: number, @CurrentUser() user: User) {
    const wishlist = await this.wishlistService.getById(id);

    if (!this.wishlistService.canUserAccess(user.id, wishlist)) {
      throw new ForbiddenException();
    }

    return wishlist;
  }

  @Post()
  async createWishlist(
    @Body() dto: CreateWishlistDto,
    @CurrentUser() user: User,
  ) {
    return this.wishlistService.create(dto, user);
  }

  @Patch(':id')
  async updateWishlist(
    @Param('id') id: number,
    @Body() dto: CreateWishlistDto,
    @CurrentUser() user: User,
  ) {
    const canUpdate = await this.wishlistService.canUserMutate(user.id, id);

    if (!canUpdate) {
      throw new ForbiddenException();
    }

    return this.wishlistService.update(id, dto);
  }

  @Post(':id/reserve-item/:itemId')
  async toggleReserveWishlistItem(
    @Param('id') wishlistId: number,
    @Param('itemId') wishlistItemId: number,
    @CurrentUser() user: User,
  ) {
    const wishlist = await this.wishlistService.getById(wishlistId);

    if (!wishlist) {
      throw new NotFoundException();
    }

    const canReserve = await this.wishlistService.canUserAccess(
      user.id,
      wishlist,
    );

    if (!canReserve) {
      throw new ForbiddenException();
    }

    if (wishlist.creator.id === user.id) {
      throw new OwnerCannotReserveItemException();
    }

    return this.wishlistService.toggleItemReserved(
      wishlist,
      +wishlistItemId,
      user,
    );
  }

  @Delete(':id')
  async removeWishlist(@Param('id') id: number, @CurrentUser() user: User) {
    const canRemove = await this.wishlistService.canUserMutate(user.id, id);

    if (!canRemove) {
      throw new ForbiddenException();
    }

    return this.wishlistService.remove(id);
  }
}
