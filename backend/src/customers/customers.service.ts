import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      // Check if customer already exists for this user
      const existingCustomer = await this.findByUserId(createCustomerDto.userId);
      
      if (existingCustomer) {
        // Update existing customer
        Object.assign(existingCustomer, createCustomerDto);
        return await this.customerRepository.save(existingCustomer);
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

      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error creating customer:', error);
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    try {
      return await this.customerRepository.findOne({
        where: { userId },
        relations: ['user']
      });
    } catch (error) {
      console.error('Error finding customer by user ID:', error);
      throw new InternalServerErrorException('Failed to find customer');
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find({
        relations: ['user']
      });
    } catch (error) {
      console.error('Error finding all customers:', error);
      throw new InternalServerErrorException('Failed to find customers');
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id },
        relations: ['user']
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error finding customer:', error);
      throw new InternalServerErrorException('Failed to find customer');
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      Object.assign(customer, updateCustomerDto);
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating customer:', error);
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const customer = await this.findOne(id);
      await this.customerRepository.remove(customer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error removing customer:', error);
      throw new InternalServerErrorException('Failed to remove customer');
    }
  }
} 