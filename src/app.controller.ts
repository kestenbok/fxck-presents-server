import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './core/decorators/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('/health')
  @HttpCode(HttpStatus.OK)
  healthcheck() {
    return { status: 'ok' };
  }
}
