import { Replace } from '../helpers/Replace';
import { Account } from './account';

export interface IUserData {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date | null;
  active: boolean;
  accounts?: Account[];
}
export class User {
  private _id?: number;
  private data: IUserData;

  constructor(
    data: Replace<
      IUserData,
      { createdAt: Date; lastLogin: Date; active: boolean }
    >,
    id?: number,
  ) {
    this._id = id;
    this.data = {
      ...data,
      createdAt: data.createdAt ?? new Date(),
      lastLogin: data.lastLogin ?? null,
      active: data.active ?? true,
    };
  }

  public get id(): number | undefined {
    return this._id;
  }
  public get name(): string {
    return this.data.name;
  }
  public set name(name: string) {
    this.data.name = name;
  }
  public get email(): string {
    return this.data.email;
  }
  public isActive(): boolean {
    return this.data.active;
  }
  public setAsInactive() {
    this.data.active = false;
  }
  public setAsActive() {
    this.data.active = true;
  }
  public get lastLogin(): Date | null {
    return this.data.lastLogin;
  }
  public updateLastLogin() {
    this.data.lastLogin = new Date();
  }
  public get accounts() {
    return this.data.accounts;
  }
}
