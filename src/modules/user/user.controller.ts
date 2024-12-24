import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getSelf(@CurrentUser() user: User) {
    return user;
  }
}
