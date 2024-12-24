import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getSelf(@CurrentUser() user: User) {
    return user;
  }
}
