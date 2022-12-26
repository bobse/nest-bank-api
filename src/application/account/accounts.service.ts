import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateTransactiontDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class AccountsService {
  constructor(private accountsRepository: AccountsRepository) {}
  async getBalance(userId: number, accountId?: number) {
    return await this.accountsRepository.getBalance(userId, accountId);
  }

  async getStatement(userId: number, accountId?: number) {
    console.log(userId);
    return await this.accountsRepository.getStatement(userId, accountId);
  }
  async newTransaction(
    userId: number,
    createTransactionDTO: CreateTransactiontDto,
  ) {
    const transaction = new Transaction(createTransactionDTO);
    await this.accountsRepository.createTransaction(userId, transaction);
  }
}
