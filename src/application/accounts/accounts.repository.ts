import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { HTTPAccountBalanceResponse } from './view_model/account.viewmodel';

export abstract class AccountsRepository {
  abstract getBalance(
    userId: number,
    accountId: number | undefined,
  ): Promise<HTTPAccountBalanceResponse[]>;

  abstract getStatement(
    userId: number,
    accountId: number | undefined,
  ): Promise<Account>;

  abstract createTransaction(
    userId: number,
    transaction: Transaction,
  ): Promise<void>;
}
