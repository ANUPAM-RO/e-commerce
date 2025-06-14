import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

export const electronicsProducts = [
  {
    name: 'MacBook Pro 16"',
    description: 'Apple M2 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display',
    price: 2499.99,
    stock: 50,
    isActive: true,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Wireless Noise Cancelling Headphones with 30-hour battery life and premium sound quality',
    price: 399.99,
    stock: 100,
    isActive: true,
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: '6.8-inch Dynamic AMOLED 2X, 12GB RAM, 256GB storage, 200MP camera',
    price: 1199.99,
    stock: 75,
    isActive: true,
  },
  {
    name: 'Apple AirPods Pro 2',
    description: 'Active Noise Cancellation, Spatial Audio, MagSafe Charging Case',
    price: 249.99,
    stock: 200,
    isActive: true,
  },
  {
    name: 'Dell XPS 15',
    description: 'Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 3050 Ti, 15.6" 4K OLED display',
    price: 2299.99,
    stock: 30,
    isActive: true,
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'M2 chip, 256GB storage, 12.9-inch Liquid Retina XDR display with ProMotion',
    price: 1099.99,
    stock: 60,
    isActive: true,
  },
  {
    name: 'Samsung 65" QLED TV',
    description: '4K UHD Smart TV with Quantum HDR, Alexa Built-in, 2023 Model',
    price: 1499.99,
    stock: 25,
    isActive: true,
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Wireless Mouse with Ultra-fast scrolling, 8K DPI sensor, and multi-device connectivity',
    price: 99.99,
    stock: 150,
    isActive: true,
  },
  {
    name: 'DJI Mini 3 Pro',
    description: 'Lightweight Drone with 4K/60fps video, 48MP photos, and 34-minute flight time',
    price: 759.99,
    stock: 40,
    isActive: true,
  },
  {
    name: 'Apple Watch Series 8',
    description: 'GPS + Cellular, Always-On Retina display, Heart Rate Monitor, Sleep Tracking',
    price: 499.99,
    stock: 80,
    isActive: true,
  },
];

export async function seedProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(Product);

  // Clear existing products
  await productRepository.clear();

  // Insert new products
  for (const product of electronicsProducts) {
    await productRepository.save(product);
  }

  console.log('Products seeded successfully!');
} 