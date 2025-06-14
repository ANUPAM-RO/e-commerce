export declare enum OrderStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class UpdateOrderDto {
    status?: OrderStatus;
}
