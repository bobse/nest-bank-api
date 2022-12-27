import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '@src/application/accounts/accounts.repository';
import { Account } from '@src/application/accounts/entities/account.entity';
import { Transaction } from '@src/application/accounts/entities/transaction.entity';
import { HTTPAccountBalanceResponse } from '@src/application/accounts/view_model/account.viewmodel';
import { PrismaService } from '../prisma.service';
import { PrismaAccountsMapper } from './prisma.accounts.mapper';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}

  async getBalance(
    userId: number,
    accountId: number | undefined,
  ): Promise<HTTPAccountBalanceResponse[]> {
    let accountIds: number[];
    if (!accountId) {
      accountIds = await this.getAllAccountsIdfromUserId(userId);
    } else {
      accountIds = [accountId];
    }
    const prismaBalance = await this.prisma.transaction.groupBy({
      by: ['accountId'],
      where: {
        accountId: { in: accountIds },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        accountId: 'asc',
      },
    });
    if (prismaBalance.length === 0) {
      return accountIds.map((accountId) => {
        return {
          accountId: accountId,
          date: new Date(),
          totalBalance: 0,
        };
      });
    }
    return PrismaAccountsMapper.balanceToDomain(prismaBalance);
  }

  async getStatement(userId: number, accountId: number): Promise<Account> {
    const searchParams = {
      where: {
        accountIdUserId: { userId: userId, id: accountId },
      },
      include: {
        transactions: true,
      },
    };

    const prismaStatement = await this.prisma.account.findUniqueOrThrow(
      searchParams,
    );
    return PrismaAccountsMapper.statementToDomain(prismaStatement, userId);
  }

  async createTransaction(
    userId: number,
    transaction: Transaction,
  ): Promise<void> {
    await this.prisma.transaction.create({
      data: {
        accountId: transaction.accountId,
        description: transaction.description,
        date: transaction.date,
        amount: transaction.amount,
      },
    });
  }

  async getAllAccountsIdfromUserId(userId: number) {
    let accountIds: number[];
    const searchParams = {
      where: {
        userId: userId,
      },
    };
    const userAccounts = await this.prisma.account.findMany(searchParams);
    if (userAccounts) {
      accountIds = userAccounts.map((account) => account.id);
    } else {
      accountIds = [];
    }
    return accountIds;
  }
}
