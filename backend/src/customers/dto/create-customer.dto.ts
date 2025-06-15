import { IsString, IsEmail, IsUUID, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
} 