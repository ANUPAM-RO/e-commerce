import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQService {
    private readonly client;
    constructor(client: ClientProxy);
    publishOrderCreated(order: any): Promise<import("rxjs").Observable<any>>;
    publishOrderUpdated(order: any): Promise<import("rxjs").Observable<any>>;
    publishOrderCancelled(order: any): Promise<import("rxjs").Observable<any>>;
    sendMessage(pattern: string, data: any): Promise<import("rxjs").Observable<any>>;
    sendAndReceive(pattern: string, data: any): Promise<import("rxjs").Observable<any>>;
}
