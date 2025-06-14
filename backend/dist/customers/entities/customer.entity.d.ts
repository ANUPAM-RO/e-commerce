import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
export declare class Customer {
    id: string;
    userId: string;
    user: User;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
