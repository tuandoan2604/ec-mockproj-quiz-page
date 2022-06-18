import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/biz/user/user.service';
import { AuthService } from 'src/biz/auth/auth.service';
import { LoginReqBody, RegisterReqBody } from './user.request';
import { UserDTO } from '../../biz/user/user.dto';
import { generateSalt } from 'src/utils/helper';
import { JwtPayload } from 'src/biz/auth/auth.dto';

@Controller('/user')
export class UserController {
  // constructor(private readonly userService: UserService) {}
  @Post('/login')
  async login(@Body() reqBody: LoginReqBody): Promise<any> {
    const { username, password } = reqBody;
    if (!username || !password)
      throw new HttpException(
        'username or password is missing',
        HttpStatus.BAD_REQUEST,
      );
    const user = await UserService.findByUsername(username);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    const validation = await AuthService.validate(
      password,
      user.password,
      user.salt,
    );
    if (!validation)
      throw new HttpException(
        'username or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    return AuthService.generateLoginToken(username, user.role);
  }
  @Post('/register')
  async register(@Body() reqBody: RegisterReqBody): Promise<any> {
    const username = reqBody.username;
    const password = reqBody.password;
    if (!username || !password)
      throw new HttpException(
        'username or password is missing',
        HttpStatus.BAD_REQUEST,
      );
    const checkUserExist = await UserService.findByUsername(username);
    if (checkUserExist)
      throw new HttpException(
        'username is already taken',
        HttpStatus.BAD_REQUEST,
      );
    const salt = generateSalt();
    const user = await UserService.createUser({
      username,
      password: AuthService.encodePassword(password, salt),
      salt,
      role: 'normal',
    } as UserDTO);
    delete user.password;
    delete user.salt;
    return user;
  }
  @Get('/me')
  async getUserInfo(): Promise<any> {
    return 'me';
  }
  @Post('/refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<any> {
    if (!refreshToken)
      throw new HttpException(
        'refreshToken is missing',
        HttpStatus.BAD_REQUEST,
      );
    const verification = AuthService.verifyRefreshToken(refreshToken);
    if (verification)
      throw new HttpException('refresh token fail ', HttpStatus.BAD_REQUEST);
    return AuthService.generateRefreshToken(
      verification as JwtPayload,
      refreshToken,
    );
  }
}
