import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async publishOrderCreated(order: any) {
    return this.client.emit('order.created', order);
  }

  async publishOrderUpdated(order: any) {
    return this.client.emit('order.updated', order);
  }

  async publishOrderCancelled(order: any) {
    return this.client.emit('order.cancelled', order);
  }

  async sendMessage(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }

  async sendAndReceive(pattern: string, data: any) {
    return this.client.send(pattern, data);
  }
} 