import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../../domain/interfaces/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { randomUUID, randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new User(
      randomUUID(),
      dto.name,
      dto.email,
      hashedPassword,
      this.generateReferralCode(),
      dto.referredBy || null,
      new Date(),
    );

    await this.userRepository.save(newUser);
    return newUser;
  }

  private generateReferralCode(): string {
    return randomBytes(4).toString('hex').toUpperCase();
  }
}