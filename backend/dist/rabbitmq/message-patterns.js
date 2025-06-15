"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_PATTERNS = exports.ORDER_PATTERNS = exports.PRODUCT_PATTERNS = void 0;
exports.PRODUCT_PATTERNS = {
    CREATED: 'product.created',
    UPDATED: 'product.updated',
    DELETED: 'product.deleted',
    STOCK_UPDATED: 'product.stock.updated',
    PRICE_UPDATED: 'product.price.updated',
};
exports.ORDER_PATTERNS = {
    CREATED: 'order.created',
    UPDATED: 'order.updated',
    CANCELLED: 'order.cancelled',
    COMPLETED: 'order.completed',
    STATUS_CHANGED: 'order.status.changed',
};
exports.CUSTOMER_PATTERNS = {
    CREATED: 'customer.created',
    UPDATED: 'customer.updated',
    DELETED: 'customer.deleted',
    ADDRESS_UPDATED: 'customer.address.updated',
    PROFILE_UPDATED: 'customer.profile.updated',
};
//# sourceMappingURL=message-patterns.js.map