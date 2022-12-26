import { User } from './user.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Transaction } from 'src/accounts/entities/transaction';

describe('User', () => {
  it('should be able to create a User', () => {
    const user = new User({
      name: 'Roberto',
      email: 'roberto@robertoseba.com',
      password: 'password',
    });

    expect(user).toBeTruthy();
  });

  it('should be encrypt password', () => {
    const user = new User({
      name: 'Roberto',
      email: 'roberto@robertoseba.com',
      password: 'password',
    });
    expect(user.checkPassword('password')).toBeTruthy();
  });

  it('should have active user', () => {
    const user = new User({
      name: 'Roberto',
      email: 'roberto@robertoseba.com',
      password: 'password',
    });
    expect(user.isActive()).toBeTruthy();
    expect(JSON.parse(JSON.stringify(user)).data).toEqual(
      expect.objectContaining({
        name: 'Roberto',
        email: 'roberto@robertoseba.com',
        lastLogin: null,
        active: true,
      }),
    );
  });

  it('should have an account attached', () => {
    const user = new User({
      name: 'Roberto',
      email: 'roberto@robertoseba.com',
      password: 'password',
      accounts: [new Account({ userId: 0, transactions: [] })],
    });
    expect(user.accounts?.length).toBe(1);
    expect(user.accounts && user.accounts[0].transactions.length).toBe(0);
  });

  it('should have an account attached and transactions', () => {
    const transaction = new Transaction({
      accountId: 0,
      description: 'Transaction',
      amount: 200.3,
      date: new Date(),
    });
    const user = new User({
      name: 'Roberto',
      email: 'roberto@robertoseba.com',
      password: 'password',
      accounts: [new Account({ userId: 0, transactions: [transaction] })],
    });
    expect(user.accounts?.length).toBe(1);
    expect(user.accounts && user.accounts[0].transactions.length).toBe(1);
  });
});
