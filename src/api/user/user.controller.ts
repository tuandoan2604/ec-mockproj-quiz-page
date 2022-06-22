import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/biz/user/user.service';
import { AuthService } from 'src/biz/auth/auth.service';
import { RegisterUserDTO, LoginDTO } from './user.dto';
import { generateSalt } from 'src/utils/helper';
import { JwtPayload } from 'src/biz/auth/auth.dto';
import { UserReq } from '../decorator/user.decorator';
import { UserTranform } from './user.tranform';

@Controller('/user')
export class UserController {
  // constructor(private readonly userService: UserService) {}
  @Post('/login')
  async login(@Body() reqBody: LoginDTO): Promise<any> {
    const { username, password } = reqBody;
    const user = await UserService.findByUsername(username);
    if (!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    const validation = AuthService.validate(password, user.password, user.salt);
    if (!validation) throw new HttpException('username or password is incorrect', HttpStatus.BAD_REQUEST);
    return AuthService.generateLoginToken(user.id, username, user.role);
  }
  @Post('/register')
  async register(@Body() reqBody: RegisterUserDTO): Promise<any> {
    const { username } = reqBody;
    const checkUserExist = await UserService.findByUsername(username);
    if (checkUserExist) throw new HttpException('username is already taken', HttpStatus.BAD_REQUEST);
    const salt = generateSalt();
    const userEntity = UserTranform.toUserEntity(reqBody, salt, 'normal');
    const user = await UserService.createUser(userEntity);
    delete user.password;
    delete user.salt;
    return user;
  }
  @Get('/me')
  async getUserInfo(@UserReq() userReq: JwtPayload): Promise<any> {
    return userReq;
  }
  @Post('/refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<any> {
    if (!refreshToken) throw new HttpException('refreshToken is missing', HttpStatus.BAD_REQUEST);
    const verification = AuthService.verifyRefreshToken(refreshToken);
    if (!verification) throw new HttpException('refresh token fail ', HttpStatus.BAD_REQUEST);
    delete verification.iat;
    delete verification.exp;
    delete verification.iss;
    return AuthService.generateRefreshToken(verification as JwtPayload, refreshToken);
  }
}
