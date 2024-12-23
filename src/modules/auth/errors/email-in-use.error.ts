import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseException extends HttpException {
  constructor() {
    super('EMAIL_IN_USE', HttpStatus.BAD_REQUEST);
  }
}
