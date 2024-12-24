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
import { User } from '../user/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async listWishlists(@CurrentUser() user: User) {
    /**
     * @todo: In the near future we will need to add
     * all of the wishlists that the user's been invited to
     * onto this list as well
     */
    return this.wishlistService.listByUserId(user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    /**
     * @todo: will need to check whether the wishlist is:
     * a) created by the user
     * b) one that the user's been invited to
     */
    return this.wishlistService.getById(id);
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
    const canUpdate = await this.wishlistService.userCanMutate(user.id, id);

    if (!canUpdate) {
      throw new ForbiddenException();
    }

    return this.wishlistService.update(id, dto);
  }

  @Delete(':id')
  async removeWishlist(@Param('id') id: number, @CurrentUser() user: User) {
    const canRemove = await this.wishlistService.userCanMutate(user.id, id);

    if (!canRemove) {
      throw new ForbiddenException();
    }

    return this.wishlistService.remove(id);
  }
}
