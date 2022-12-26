import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@src/db/prisma/prisma.service';
import { PrismaUserRepository } from '@src/db/prisma/repositories/prisma.users.repository';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
