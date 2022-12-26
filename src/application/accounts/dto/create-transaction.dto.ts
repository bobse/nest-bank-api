import { IsDateString, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateTransactiontDto {
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @MinLength(5)
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  amount: number;
}
