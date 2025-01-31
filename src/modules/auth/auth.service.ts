import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { EmailInUseException } from './errors/email-in-use.error';
import { InvalidCredentialsException } from './errors/invalid-credentials.error';
import { HasherService } from './hasher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly hasherService: HasherService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (user !== null) {
      throw new EmailInUseException();
    }

    const hashedPassword = await this.hasherService.hash(dto.password);
    dto.password = hashedPassword;

    const createdUser = await this.userService.create(dto);
    return this.generateToken(createdUser.id);
  }

  async login(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isCorrectPassword = await this.hasherService.compare(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new InvalidCredentialsException();
    }

    return this.generateToken(user.id);
  }

  private async generateToken(userId: number) {
    const token = await this.jwtService.sign({ sub: userId });
    return { access_token: token };
  }
}
