import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('JWT Auth Guard', user);
    if (err || !user) {
      console.error('JWT Auth Error:', err || 'No user found');
      console.error('JWT Info:', info);
      throw new UnauthorizedException('Invalid or expired token');
    }
    return user;
  }
} 