"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let RabbitMQService = class RabbitMQService {
    constructor(productClient, orderClient, customerClient) {
        this.productClient = productClient;
        this.orderClient = orderClient;
        this.customerClient = customerClient;
    }
    async publishProductMessage(pattern, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.productClient.emit(pattern, data));
        }
        catch (error) {
            console.error('Error publishing product message:', error);
            throw error;
        }
    }
    async sendProductMessage(pattern, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.productClient.send(pattern, data));
        }
        catch (error) {
            console.error('Error sending product message:', error);
            throw error;
        }
    }
    async publishOrderMessage(pattern, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.orderClient.emit(pattern, data));
        }
        catch (error) {
            console.error('Error publishing order message:', error);
            throw error;
        }
    }
    async sendOrderMessage(pattern, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.orderClient.send(pattern, data));
        }
        catch (error) {
            console.error('Error sending order message:', error);
            throw error;
        }
    }
    async publishCustomerMessage(pattern, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.customerClient.emit(pattern, data));
        }
        catch (error) {
            console.error('Error publishing customer message:', error);
            throw error;
        }
    }
    async sendCustomerMessage(pattern, data) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.customerClient.send(pattern, data));
        }
        catch (error) {
            console.error('Error sending customer message:', error);
            throw error;
        }
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_SERVICE')),
    __param(1, (0, common_1.Inject)('ORDER_SERVICE')),
    __param(2, (0, common_1.Inject)('CUSTOMER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map