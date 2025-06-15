import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customersService.create(createCustomerDto);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.customersService.findAll();
    } catch (error) {
      console.error('Error finding customers:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.customersService.findOne(id);
    } catch (error) {
      console.error('Error finding customer:', error);
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.customersService.update(id, updateCustomerDto);
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.customersService.remove(id);
    } catch (error) {
      console.error('Error removing customer:', error);
      throw error;
    }
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    try {
      return await this.customersService.findByUserId(userId);
    } catch (error) {
      console.error('Error finding customer by user ID:', error);
      throw error;
    }
  }
} 