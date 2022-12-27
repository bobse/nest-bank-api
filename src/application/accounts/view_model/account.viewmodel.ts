import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';

export class AccountStatementViewModel {
  static toHTTP(account: Account): HTTPStatementResponse {
    return {
      accountId: account.id,
      date: new Date(),
      transactions: account.transactions.map((transaction) => {
        return {
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount,
        };
      }),
    };
  }
}

class HTTPTransactionsResponse {
  @ApiProperty()
  date: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  amount: number;
}
export class HTTPStatementResponse {
  @ApiProperty({ type: Number })
  accountId: number | undefined;
  @ApiProperty({ type: Date })
  date: Date;
  @ApiProperty({ type: [HTTPTransactionsResponse] })
  transactions: HTTPTransactionsResponse[];
}

export class HTTPAccountBalanceResponse {
  @ApiProperty({ type: Number })
  accountId: number;
  @ApiProperty({ type: Number })
  totalBalance: number;
  @ApiProperty({ type: Date })
  date: Date;
}
