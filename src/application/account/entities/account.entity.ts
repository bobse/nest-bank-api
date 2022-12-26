import { Replace } from '../../../helpers/Replace';
import { ITransaction } from './transaction.entity';

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
  public get id() {
    return this.data.id;
  }
  public get transactions() {
    return this.data.transactions;
  }
  public get createdAt() {
    return this.data.createdAt;
  }
}
