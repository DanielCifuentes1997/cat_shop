import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    ProductsModule,
    OrdersModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}