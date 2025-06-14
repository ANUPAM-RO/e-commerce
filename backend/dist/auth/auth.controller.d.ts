import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    verify(): Promise<{
        message: string;
    }>;
}
