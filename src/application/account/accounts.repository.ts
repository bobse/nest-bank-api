import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { IAccountBalance } from './interfaces/balance.interface';
import { IAccountStatement } from './interfaces/statement.interfaces';

export abstract class AccountsRepository {
  abstract getBalance(
    userId: number,
    accountId: number | undefined,
  ): Promise<IAccountBalance[]>;

  abstract getStatement(
    userId: number,
    accountId: number | undefined,
  ): Promise<Account>;

  abstract createTransaction(
    userId: number,
    transaction: Transaction,
  ): Promise<void>;
}
