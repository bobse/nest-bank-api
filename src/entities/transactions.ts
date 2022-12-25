import { Replace } from '../helpers/Replace';

export interface ITransaction {
  // accountId: number;
  description: string;
  date: Date;
  amount: number;
}

export class Transaction {
  private _id?: number;
  public data: ITransaction;

  constructor(data: Replace<ITransaction, { date: Date }>, id?: number) {
    this._id = id;
    this.data = { ...data, date: data.date ?? new Date() };
  }
}
