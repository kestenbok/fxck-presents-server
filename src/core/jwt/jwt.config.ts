import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: this.configService.getOrThrow('JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.getOrThrow('JWT_EXPIRY_TIME'),
      },
    };
  }
}
