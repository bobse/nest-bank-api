import { Transaction } from '../entities/transaction.entity';

export interface IAccountStatement {
  accountId: number;
  date: Date;
  transactions: Transaction[];
}
