import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/db/prisma/prisma.service';
import { PrismaAccountsRepository } from '@src/db/prisma/repositories/prisma.accounts.repository';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        PrismaService,

        {
          provide: AccountsRepository,
          useClass: PrismaAccountsRepository,
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
