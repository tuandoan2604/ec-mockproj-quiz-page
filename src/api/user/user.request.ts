import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
  IsOptional,
} from 'class-validator';

export class LoginReqBody {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class RegisterReqBody {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
