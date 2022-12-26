import {
  Account as PrismaAccount,
  Prisma,
  Transaction as PrismaTransaction,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Account } from '@src/application/accounts/entities/account.entity';
import { Transaction } from '@src/application/accounts/entities/transaction.entity';
import { IAccountBalance } from '@src/application/accounts/interfaces/balance.interface';

export class PrismaAccountsMapper {
  // static toPrisma(user: User) {}
  static statementToDomain(
    account: PrismaAccount & {
      transactions: PrismaTransaction[];
    },
    userId: number,
  ): Account {
    const transactions = account.transactions.map((trans) => {
      return new Transaction({
        id: trans.id,
        accountId: trans.accountId,
        description: trans.description,
        date: trans.date,
        amount: +trans.amount,
      });
    });
    return new Account({
      id: account.id,
      userId: userId,
      createdAt: account.createdAt,
      transactions: transactions,
    });
  }

  static balanceToDomain(
    prismaBalance: (Prisma.PickArray<
      Prisma.TransactionGroupByOutputType,
      'accountId'[]
    > & {
      _sum: {
        amount: Decimal | null;
      };
    })[],
  ): IAccountBalance[] {
    return prismaBalance.map((account) => {
      return {
        accountId: account.accountId,
        date: new Date(),
        totalBalance: account._sum.amount !== null ? +account._sum.amount : 0,
      };
    });
  }
}
