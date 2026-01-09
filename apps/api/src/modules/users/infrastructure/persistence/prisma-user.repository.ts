import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        createdAt: user.createdAt,
        wallet: {
          create: {
            balance: 0
          }
        }
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const savedUser = await this.prisma.user.findUnique({ where: { email } });
    if (!savedUser) return null;
    return new User(
      savedUser.id,
      savedUser.email,
      savedUser.referralCode,
      savedUser.referredBy,
      savedUser.createdAt,
    );
  }

  async findByReferralCode(code: string): Promise<User | null> {
    const savedUser = await this.prisma.user.findUnique({
      where: { referralCode: code },
    });
    if (!savedUser) return null;
    return new User(
      savedUser.id,
      savedUser.email,
      savedUser.referralCode,
      savedUser.referredBy,
      savedUser.createdAt,
    );
  }
}