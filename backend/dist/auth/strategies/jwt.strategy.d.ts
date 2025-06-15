import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private readonly jwtSecret;
    constructor(usersService: UsersService, jwtSecret: string);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        name: string;
    }>;
}
export {};
