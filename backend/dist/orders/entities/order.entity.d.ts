import { OrderItem } from './order-item.entity';
export declare class Order {
    id: string;
    customerId: string;
    totalAmount: number;
    status: string;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
