import { DataSource } from 'typeorm';
export declare const electronicsProducts: {
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
}[];
export declare function seedProducts(dataSource: DataSource): Promise<void>;
