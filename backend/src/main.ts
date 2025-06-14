import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedProducts } from './products/products.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Set global prefix
  app.setGlobalPrefix('api');

  // Get the data source instance
  const dataSource = app.get(DataSource);

  // Seed the products
  // await seedProducts(dataSource);

  await app.listen(process.env.PORT || 3001);
  console.log(`Product & Order Service is running on: ${await app.getUrl()}`);
}
bootstrap(); 