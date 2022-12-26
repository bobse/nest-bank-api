import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Replace } from '@src/helpers/Replace';
import { User } from '../users/entities/user.entity';
import { AccountsRepository } from './accounts.repository';
import { CreateTransactiontDto } from './dto/create-transaction.dto';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class AccountsService {
  constructor(private accountsRepository: AccountsRepository) {}
  async getBalance(
    user: Replace<User, { id: number; accounts: Account[] }>,
    accountId?: number,
  ) {
    if (accountId) {
      this.checkAccountIsFromUser(user, accountId);
    }
    return await this.accountsRepository.getBalance(user.id, accountId);
  }

  async getStatement(
    user: Replace<User, { id: number; accounts: Account[] }>,
    accountId: number,
  ) {
    if (accountId) {
      this.checkAccountIsFromUser(user, accountId);
    }
    return await this.accountsRepository.getStatement(user.id, accountId);
  }
  async newTransaction(
    user: Replace<User, { id: number; accounts: Account[] }>,
    createTransactionDTO: CreateTransactiontDto,
  ) {
    this.checkAccountIsFromUser(user, createTransactionDTO.accountId);
    const transaction = new Transaction(createTransactionDTO);
    await this.accountsRepository.createTransaction(user.id, transaction);
  }

  checkAccountIsFromUser(
    user: Replace<User, { id: number; accounts: Account[] }>,
    accountId: number,
  ): void {
    const accountIds = user.accounts.map((account) => account.id);
    if (!accountIds.includes(accountId)) {
      throw new HttpException(
        'Account does not belong to the user or is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
