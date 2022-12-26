import { Replace } from '../../helpers/Replace';

export interface ITransaction {
  accountId: number;
  description: string;
  date: Date;
  amount: number;
}

export class Transaction {
  private _id?: number;
  private data: ITransaction;

  constructor(data: Replace<ITransaction, { date?: Date }>, id?: number) {
    this._id = id;
    this.data = { ...data, date: data.date ?? new Date() };
  }
  public get accountId() {
    return this.data.accountId;
  }
  public get description() {
    return this.data.description;
  }
  public get date() {
    return this.data.date;
  }
  public get amount() {
    return this.data.amount;
  }
}
