import { Replace } from '../../helpers/Replace';
import { ITransaction } from './transaction';

export interface IAccount {
  id?: number;
  userId: number;
  createdAt: Date;
  transactions: ITransaction[];
}

export class Account {
  private data: IAccount;

  constructor(data: Replace<IAccount, { createdAt?: Date }>) {
    this.data = { ...data, createdAt: data.createdAt ?? new Date() };
  }
  public get transactions() {
    return this.data.transactions;
  }
  public get createdAt() {
    return this.data.createdAt;
  }
}
