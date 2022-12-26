import { User } from '@src/application/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { Account as PrismaAccount } from '@prisma/client';

export class PrismaUserMapper {
  // static toPrisma(user: User) {}
  static toDomain(
    prismaUser: PrismaUser & {
      accounts: PrismaAccount[];
    },
  ) {
    const { accounts, ...user } = prismaUser;
    Object.assign(user, { accounts: accounts });
    return new User({ ...user });
  }
}
