import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HasherService {
  async hash(value: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
  }

  async compare(plain: string, encrypted: string) {
    return bcrypt.compare(plain, encrypted);
  }
}
