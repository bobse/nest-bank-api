import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserViewModel {
  static toHTTP(user: User): ProfileHttpResponse {
    return {
      name: user.name,
      lastLogin: user.lastLogin,
      active: user.isActive(),
      accounts: user.accounts.map((acc) => acc.id),
    };
  }
}

export class ProfileHttpResponse {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Date })
  lastLogin: Date | null;
  @ApiProperty()
  active: boolean;
  @ApiProperty({ type: [Number] })
  accounts: (number | undefined)[];
}
