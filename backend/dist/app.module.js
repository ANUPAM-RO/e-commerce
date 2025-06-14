"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const rabbitmq_module_1 = require("./rabbitmq/rabbitmq.module");
const customers_module_1 = require("./customers/customers.module");
const auth_module_1 = require("./auth/auth.module");
const product_entity_1 = require("./products/entities/product.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const order_item_entity_1 = require("./orders/entities/order-item.entity");
const user_entity_1 = require("./users/entities/user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'user'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE', 'ecommerce_db'),
                    synchronize: configService.get('DB_SYNC', true),
                    logging: configService.get('DB_LOGGING', false),
                    entities: [product_entity_1.Product, order_entity_1.Order, order_item_entity_1.OrderItem, user_entity_1.User],
                    autoLoadEntities: true,
                }),
            }),
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            rabbitmq_module_1.RabbitMQModule,
            customers_module_1.CustomersModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map