import JWT from 'jsonwebtoken';
import SHA1 from 'sha1';
import MD5 from 'md5';
import { Injectable } from '@nestjs/common';
import JwtConfig from '../../config/auth.config';
import { JwtPayload } from './auth.dto';

@Injectable()
export class AuthService {
  public static encodePassword(inputPassword: string, salt: string): string {
    return SHA1(MD5(inputPassword) + salt);
  }
  public static validate(inputPassword: string, encodedPassword: string, salt: string): boolean {
    return encodedPassword === this.encodePassword(inputPassword, salt);
  }
  public static signJWT = (payload, expire, key) => {
    const option = {
      algorithm: 'HS256',
      expiresIn: expire,
      issuer: 'backend-node',
    };
    return JWT.sign(payload, key, option);
  };
  public static generateLoginToken(userId: number, username: string, role: string) {
    const payload = {
      userId,
      username,
      role,
    } as JwtPayload;
    const accessToken = this.signJWT(payload, JwtConfig().jwtAccessTokenExpiresIn, JwtConfig().jwtAccessTokenSecretKey);
    const refreshToken = this.signJWT(payload, JwtConfig().jwtRefreshTokenExpiresIn, JwtConfig().jwtRefreshTokenSecretKey);
    return {
      accessToken,
      refreshToken,
    };
  }
  public static verifyAccessToken(token: string): any {
    return JWT.verify(token, JwtConfig().jwtAccessTokenSecretKey);
  }
  public static verifyRefreshToken(token: string): any {
    return JWT.verify(token, JwtConfig().jwtRefreshTokenSecretKey);
  }
  public static generateRefreshToken(payload: JwtPayload, accessToken: string) {
    const refreshToken = this.signJWT(payload, JwtConfig().jwtRefreshTokenExpiresIn, JwtConfig().jwtRefreshTokenSecretKey);
    return {
      accessToken,
      refreshToken,
    };
  }
}
