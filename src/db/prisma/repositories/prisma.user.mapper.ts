import { User } from '@src/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { Account as PrismaAccount } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    // return {
    //   name: user.name,
    //   email: user.email,
    //   password: user.password,
    //   active: user.isActive,
    //   accounts: user.accounts
    //   accounts: {
    //     create: {  },
    //   },
    // };
  }
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
