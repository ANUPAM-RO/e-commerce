import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private usersRepository;
    constructor(usersService: UsersService, jwtService: JwtService, usersRepository: Repository<User>);
    validateUser(email: string, password: string): Promise<any>;
    register(email: string, password: string, name: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
    verifyToken(token: string): Promise<{
        userId: any;
        email: any;
        name: string;
    }>;
}
