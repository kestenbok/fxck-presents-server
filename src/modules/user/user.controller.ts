import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getSelf(@CurrentUser() user: User) {
    return user;
  }
}
