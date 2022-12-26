import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/db/prisma/prisma.service';
import { PrismaAccountsRepository } from '@src/db/prisma/repositories/prisma.accounts.repository';
import { AccountsRepository } from '@src/application/accounts/accounts.repository';
import { AccountsService } from '@src/application/accounts/accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        PrismaService,

        {
          provide: AccountsRepository,
          useClass: PrismaAccountsRepository,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
