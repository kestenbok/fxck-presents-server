import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
  }
}
