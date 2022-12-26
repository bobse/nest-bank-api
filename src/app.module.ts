import { Module } from '@nestjs/common';
import { UsersModule } from './application/users/users.module';
import { AccountsModule } from './application/account/accounts.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
