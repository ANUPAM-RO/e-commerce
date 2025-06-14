import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductsService } from '../products/products.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly productsService;
    private readonly rabbitMQService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productsService: ProductsService, rabbitMQService: RabbitMQService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    cancel(id: string): Promise<Order>;
}
