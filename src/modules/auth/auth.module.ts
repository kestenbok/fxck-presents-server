import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/core/jwt/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HasherService } from './hasher.service';

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
