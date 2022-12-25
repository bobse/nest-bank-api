import { Replace } from '../helpers/Replace';
import { ITransaction, Transaction } from './transactions';

export interface IAccount {
  //   userId: number;
  createdAt: Date;
  transactions: ITransaction[];
}

export class Account {
  private _id?: number;
  private data: IAccount;

  constructor(data: Replace<IAccount, { createdAt: Date }>, id?: number) {
    this._id = id;
    this.data = { ...data, createdAt: data.createdAt ?? new Date() };
  }
  public get transactions() {
    return this.data.transactions;
  }
}
