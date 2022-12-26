import { User } from './entities/user.entity';

export abstract class UserRepository {
  abstract register(user: User): Promise<void>;
  abstract findById(userId: number): Promise<User | null>;
  abstract findByEmail(userEmail: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
