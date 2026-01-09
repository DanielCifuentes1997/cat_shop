import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: ['UserRepository', CreateUserUseCase],
})
export class UsersModule {}