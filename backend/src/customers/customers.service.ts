import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Check if customer already exists for this user
    const existingCustomer = await this.findByUserId(createCustomerDto.userId);
    
    if (existingCustomer) {
      // Update existing customer
      Object.assign(existingCustomer, createCustomerDto);
      return this.customerRepository.save(existingCustomer);
    }

    // Verify user exists
    const user = await this.userRepository.findOne({
      where: { id: createCustomerDto.userId }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createCustomerDto.userId} not found`);
    }

    // Create new customer
    const customer = this.customerRepository.create({
      ...createCustomerDto,
      email: user.email // Use email from user record
    });
    return this.customerRepository.save(customer);
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { userId: userId },
      relations: ['user']
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    Object.assign(customer, updateCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
} 