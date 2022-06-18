import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../biz/auth/auth.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization || !authorization.includes('Bearer'))
      throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
    const token = authorization.split(' ')[1];
    const payload = AuthService.verifyAccessToken(token);
    console.log(payload);
    if (!payload)
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    req.user = payload;
    next();
  }
}
