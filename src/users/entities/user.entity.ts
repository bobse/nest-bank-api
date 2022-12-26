import { Replace } from '../../helpers/Replace';
import { Account } from '../../accounts/entities/account.entity';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export interface IUserData {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date | null;
  active: boolean;
  accounts?: Account[];
}

export class User {
  private data: IUserData;

  constructor(
    data: Replace<
      IUserData,
      { createdAt?: Date | null; lastLogin?: Date | null; active?: boolean }
    >,
  ) {
    this.data = {
      ...data,
      password: this.encryptPassword(data.password),
      createdAt: data.createdAt ?? new Date(),
      lastLogin: data.lastLogin ?? null,
      active: data.active ?? true,
    };
  }

  public encryptPassword(passwordPlain: string): string {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(passwordPlain, salt);
    return hashedPassword;
  }

  public checkPassword(passwordPlain: string): boolean {
    return compareSync(passwordPlain, this.data.password);
  }

  public get password(): string {
    return this.data.password;
  }

  public get id(): number | undefined {
    return this.data.id;
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
