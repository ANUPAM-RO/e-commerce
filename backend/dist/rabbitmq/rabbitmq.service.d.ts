import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQService {
    private readonly productClient;
    private readonly orderClient;
    private readonly customerClient;
    constructor(productClient: ClientProxy, orderClient: ClientProxy, customerClient: ClientProxy);
    publishProductMessage(pattern: string, data: any): Promise<any>;
    sendProductMessage(pattern: string, data: any): Promise<any>;
    publishOrderMessage(pattern: string, data: any): Promise<any>;
    sendOrderMessage(pattern: string, data: any): Promise<any>;
    publishCustomerMessage(pattern: string, data: any): Promise<any>;
    sendCustomerMessage(pattern: string, data: any): Promise<any>;
}
