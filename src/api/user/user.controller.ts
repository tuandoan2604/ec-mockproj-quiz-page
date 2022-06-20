import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/biz/user/user.service';
import { AuthService } from 'src/biz/auth/auth.service';
import { RegisterUserDTO, LoginDTO } from './user.dto';
import { generateSalt } from 'src/utils/helper';
import { JwtPayload } from 'src/biz/auth/auth.dto';

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
    return AuthService.generateLoginToken(username, user.role);
  }
  @Post('/register')
  async register(@Body() reqBody: RegisterUserDTO): Promise<any> {
    const { username } = reqBody;
    const checkUserExist = await UserService.findByUsername(username);
    if (checkUserExist) throw new HttpException('username is already taken', HttpStatus.BAD_REQUEST);
    const salt = generateSalt();
    const userEntity = reqBody.toUserEntity(salt, 'normal');
    const user = await UserService.createUser(userEntity);
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
    if (!refreshToken) throw new HttpException('refreshToken is missing', HttpStatus.BAD_REQUEST);
    const verification = AuthService.verifyRefreshToken(refreshToken);
    if (verification) throw new HttpException('refresh token fail ', HttpStatus.BAD_REQUEST);
    return AuthService.generateRefreshToken(verification as JwtPayload, refreshToken);
  }
}
