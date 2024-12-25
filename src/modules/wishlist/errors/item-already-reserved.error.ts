import { HttpException, HttpStatus } from '@nestjs/common';

export class ItemAlreadyReservedException extends HttpException {
  constructor() {
    super('ITEM_ALREADY_RESERVED', HttpStatus.BAD_REQUEST);
  }
}
