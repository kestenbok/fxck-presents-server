import { HttpException, HttpStatus } from '@nestjs/common';

export class OwnerCannotReserveItemException extends HttpException {
  constructor() {
    super('WISHLIST_OWNER_CANNOT_RESERVE_ITEM', HttpStatus.BAD_REQUEST);
  }
}
