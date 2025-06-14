import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from '../products/products.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productsService: ProductsService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items } = createOrderDto;

    // Create and save order first to get the ID
    const order = this.orderRepository.create({
      customerId,
      status: 'pending',
      totalAmount: 0,
    });
    const savedOrder = await this.orderRepository.save(order);

    // Calculate total and create order items
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await this.productsService.findOne(item.productId);
      
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product ${product.name}`);
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

      // Update product stock
      await this.productsService.updateStock(product.id, item.quantity);
    }

    // Save order items
    await this.orderItemRepository.save(orderItems);

    // Update order with total amount
    savedOrder.totalAmount = totalAmount;
    savedOrder.orderItems = orderItems;
    const updatedOrder = await this.orderRepository.save(savedOrder);
    
    // Publish order created event
    await this.rabbitMQService.publishOrderCreated(updatedOrder);

    return updatedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    
    const updatedOrder = await this.orderRepository.save(order);
    
    // Publish order updated event
    await this.rabbitMQService.publishOrderUpdated(updatedOrder);

    return updatedOrder;
  }

  async cancel(id: string): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === 'cancelled') {
      throw new BadRequestException('Order is already cancelled');
    }

    // Restore product stock
    for (const item of order.orderItems) {
      const product = await this.productsService.findOne(item.product.id);
      product.stock += item.quantity;
      await this.productsService.update(product.id, { stock: product.stock });
    }

    order.status = 'cancelled';
    const cancelledOrder = await this.orderRepository.save(order);
    
    // Publish order cancelled event
    await this.rabbitMQService.publishOrderCancelled(cancelledOrder);

    return cancelledOrder;
  }
} 