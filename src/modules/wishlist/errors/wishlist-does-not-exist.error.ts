import { HttpException, HttpStatus } from '@nestjs/common';

export class WishlistDoesNotExistException extends HttpException {
  constructor() {
    super('WISHLIST_NOT_FOUND', HttpStatus.BAD_REQUEST);
  }
}
