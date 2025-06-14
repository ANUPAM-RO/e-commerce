import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from '../users/entities/user.entity';
export declare class CustomersService {
    private readonly customerRepository;
    private readonly userRepository;
    constructor(customerRepository: Repository<Customer>, userRepository: Repository<User>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findByUserId(userId: string): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    findOne(id: string): Promise<Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    remove(id: string): Promise<void>;
}
