"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const products_service_1 = require("../products/products.service");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
let OrdersService = class OrdersService {
    constructor(orderRepository, orderItemRepository, productsService, rabbitMQService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productsService = productsService;
        this.rabbitMQService = rabbitMQService;
    }
    async create(createOrderDto) {
        const { customerId, items } = createOrderDto;
        const order = this.orderRepository.create({
            customerId,
            status: 'pending',
            totalAmount: 0,
        });
        const savedOrder = await this.orderRepository.save(order);
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await this.productsService.findOne(item.productId);
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for product ${product.name}`);
            }
            const orderItem = this.orderItemRepository.create({
                orderId: savedOrder.id,
                product,
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
                subtotal: product.price * item.quantity,
            });
            orderItems.push(orderItem);
            totalAmount += orderItem.subtotal;
            await this.productsService.updateStock(product.id, item.quantity);
        }
        await this.orderItemRepository.save(orderItems);
        savedOrder.totalAmount = totalAmount;
        savedOrder.orderItems = orderItems;
        const updatedOrder = await this.orderRepository.save(savedOrder);
        await this.rabbitMQService.publishOrderCreated(updatedOrder);
        return updatedOrder;
    }
    async findAll() {
        return this.orderRepository.find({
            relations: ['orderItems', 'orderItems.product'],
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderItems', 'orderItems.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        const updatedOrder = await this.orderRepository.save(order);
        await this.rabbitMQService.publishOrderUpdated(updatedOrder);
        return updatedOrder;
    }
    async cancel(id) {
        const order = await this.findOne(id);
        if (order.status === 'cancelled') {
            throw new common_1.BadRequestException('Order is already cancelled');
        }
        for (const item of order.orderItems) {
            const product = await this.productsService.findOne(item.product.id);
            product.stock += item.quantity;
            await this.productsService.update(product.id, { stock: product.stock });
        }
        order.status = 'cancelled';
        const cancelledOrder = await this.orderRepository.save(order);
        await this.rabbitMQService.publishOrderCancelled(cancelledOrder);
        return cancelledOrder;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService,
        rabbitmq_service_1.RabbitMQService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map