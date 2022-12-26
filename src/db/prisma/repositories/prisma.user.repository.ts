import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from './prisma.user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(userEmail: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        accounts: true,
      },
    });
    if (!prismaUser) {
      return null;
    }
    return PrismaUserMapper.toDomain(prismaUser);
  }

  async findById(userId: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accounts: true,
      },
    });
    if (!prismaUser) {
      return null;
    }
    return PrismaUserMapper.toDomain(prismaUser);
  }

  async register(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: User.encryptPassword(user.password),
        active: user.isActive(),
        accounts: {
          create: {},
        },
      },
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
