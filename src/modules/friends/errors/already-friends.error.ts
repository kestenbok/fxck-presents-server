import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyFriendsException extends HttpException {
  constructor() {
    super('ALREADY_FRIENDS', HttpStatus.BAD_REQUEST);
  }
}
