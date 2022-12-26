import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from '@src/db/prisma/prisma.service';
import { AccountsRepository } from './accounts.repository';
import { PrismaAccountsRepository } from '@src/db/prisma/repositories/prisma.accounts.repository';

@Module({
  controllers: [AccountsController],
  providers: [
    AccountsService,
    PrismaService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
  ],
})
export class AccountsModule {}
