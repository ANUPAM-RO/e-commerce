import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from '../products/products.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { Customer } from '../customers/entities/customer.entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly customerRepository;
    private readonly productsService;
    private readonly rabbitMQService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, customerRepository: Repository<Customer>, productsService: ProductsService, rabbitMQService: RabbitMQService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByUserId(userId: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    cancel(id: string): Promise<Order>;
}
