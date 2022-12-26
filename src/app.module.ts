import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
