import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/jwt.auth.guards';
import { AccountsService } from './accounts.service';
import { CreateTransactiontDto } from './dto/create-transaction.dto';
import {
  AccountStatementViewModel,
  HTTPStatementResponse,
} from './view_model/account.viewmodel';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Get(':id?/balance')
  async getBalance(@Request() req, @Param('id') id?: string) {
    return await this.accountsService.getBalance(
      req.user,
      id ? +id : undefined,
    );
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Get(':id/statement')
  async getStatement(
    @Request() req,
    @Param('id') id: string,
  ): Promise<HTTPStatementResponse> {
    return AccountStatementViewModel.toHTTP(
      await this.accountsService.getStatement(req.user, +id),
    );
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Post('transaction')
  async create(
    @Request() req,
    @Body() createTransactionDTO: CreateTransactiontDto,
  ) {
    await this.accountsService.newTransaction(req.user, createTransactionDTO);
  }
}
