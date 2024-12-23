import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { HasherService } from './hasher.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/core/jwt/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule, JwtModule.registerAsync({ useClass: JwtConfig })],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
    HasherService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
