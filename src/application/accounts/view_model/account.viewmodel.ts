import { Account } from '../entities/account.entity';

export class AccountStatementViewModel {
  static toHTTP(account: Account) {
    return {
      id: account.id,
      date: new Date(),
      transactions: account.transactions.map((transaction) => {
        return {
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount,
        };
      }),
    };
  }
}
