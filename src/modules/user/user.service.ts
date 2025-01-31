import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User(dto);

    return this.userRepository.save(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async getById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
