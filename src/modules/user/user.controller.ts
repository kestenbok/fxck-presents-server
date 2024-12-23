import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserID } from './user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getSelf(@UserID() id: number) {
    return this.userService.getById(id);
  }
}
