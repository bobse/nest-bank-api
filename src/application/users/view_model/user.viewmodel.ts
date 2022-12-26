import { User } from '../entities/user.entity';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      name: user.name,
      lastLogin: user.lastLogin,
      active: user.isActive(),
      accounts: user.accounts?.map((acc) => acc.id),
    };
  }
}
