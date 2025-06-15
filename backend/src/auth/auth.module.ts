import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const JWT_SECRET = process.env.JWT_SECRET || 'ecommerce-secret-key-2024';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { 
        expiresIn: '24h',
        algorithm: 'HS256'
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService, 
    JwtStrategy, 
    UsersService,
    {
      provide: 'JWT_SECRET',
      useValue: JWT_SECRET
    }
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {} 