import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { FriendsModule } from './modules/friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    WishlistModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
