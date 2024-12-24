import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestPendingException extends HttpException {
  constructor() {
    super('REQUEST_ALREADY_PENDING', HttpStatus.BAD_REQUEST);
  }
}
