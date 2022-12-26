import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User({ ...createUserDto });
    try {
      await this.userRepository.register(user);
    } catch (err: any) {
      let errorMessage = 'Could not save user';
      if (err.meta?.target && err.meta?.target[0] === 'email') {
        errorMessage = 'Email already saved in the database';
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async updateLastLogin(userId: number) {
    return await this.userRepository.updateLastLogin(userId);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: number) {
    return await this.userRepository.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
