import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    @Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
  ) {}

  // Product Queue Methods
  async publishProductMessage(pattern: string, data: any) {
    try {
      return await firstValueFrom(
        this.productClient.emit(pattern, data)
      );
    } catch (error) {
      console.error('Error publishing product message:', error);
      throw error;
    }
  }

  async sendProductMessage(pattern: string, data: any) {
    try {
      return await firstValueFrom(
        this.productClient.send(pattern, data)
      );
    } catch (error) {
      console.error('Error sending product message:', error);
      throw error;
    }
  }

  // Order Queue Methods
  async publishOrderMessage(pattern: string, data: any) {
    try {
      return await firstValueFrom(
        this.orderClient.emit(pattern, data)
      );
    } catch (error) {
      console.error('Error publishing order message:', error);
      throw error;
    }
  }

  async sendOrderMessage(pattern: string, data: any) {
    try {
      return await firstValueFrom(
        this.orderClient.send(pattern, data)
      );
    } catch (error) {
      console.error('Error sending order message:', error);
      throw error;
    }
  }

  // Customer Queue Methods
  async publishCustomerMessage(pattern: string, data: any) {
    try {
      return await firstValueFrom(
        this.customerClient.emit(pattern, data)
      );
    } catch (error) {
      console.error('Error publishing customer message:', error);
      throw error;
    }
  }

  async sendCustomerMessage(pattern: string, data: any) {
    try {
      return await firstValueFrom(
        this.customerClient.send(pattern, data)
      );
    } catch (error) {
      console.error('Error sending customer message:', error);
      throw error;
    }
  }
} 