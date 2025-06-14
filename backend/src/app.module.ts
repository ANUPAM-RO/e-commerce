import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'user'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE', 'ecommerce_db'),
        synchronize: configService.get('DB_SYNC', true),
        logging: configService.get('DB_LOGGING', false),
        entities: [Product, Order, OrderItem],
        autoLoadEntities: true,
      }),
    }),
    ProductsModule,
    OrdersModule,
    RabbitMQModule,
    CustomersModule,
    AuthModule,
  ],
})
export class AppModule {} 