import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

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

  @Delete(':id')
  async removeWishlist(@Param('id') id: number, @CurrentUser() user: User) {
    const canRemove = await this.wishlistService.canUserMutate(user.id, id);

    if (!canRemove) {
      throw new ForbiddenException();
    }

    return this.wishlistService.remove(id);
  }
}
