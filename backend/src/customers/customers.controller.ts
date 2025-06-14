import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
    createCustomerDto.userId = req.user.userId;
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.customersService.findByUserId(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const customer = await this.customersService.findOne(id);
    if (customer.userId !== req.user.userId) {
      throw new Error('Unauthorized access to customer data');
    }
    return customer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req
  ) {
    const customer = await this.customersService.findOne(id);
    if (customer.userId !== req.user.userId) {
      throw new Error('Unauthorized access to customer data');
    }
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const customer = await this.customersService.findOne(id);
    if (customer.userId !== req.user.userId) {
      throw new Error('Unauthorized access to customer data');
    }
    return this.customersService.remove(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string, @Request() req) {
    if (userId !== req.user.userId) {
      throw new Error('Unauthorized access to customer data');
    }
    return this.customersService.findByUserId(userId);
  }
} 