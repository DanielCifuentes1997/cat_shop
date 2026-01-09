import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}