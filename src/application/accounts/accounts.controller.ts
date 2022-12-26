import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/jwt.auth.guards';
import { AccountsService } from './accounts.service';
import { CreateTransactiontDto } from './dto/create-transaction.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id?/balance')
  async getBalance(@Request() req, @Param('id') id: string) {
    return await this.accountsService.getBalance(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/statement')
  async getStatement(@Request() req, @Param('id') id: string) {
    // TODO: create Mapper
    return await this.accountsService.getStatement(req.user.id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transaction')
  async create(
    @Request() req,
    @Body() createTransactionDTO: CreateTransactiontDto,
  ) {
    await this.accountsService.newTransaction(
      req.user.id,
      createTransactionDTO,
    );
  }
}
