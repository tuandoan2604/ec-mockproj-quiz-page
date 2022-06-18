import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
  IsOptional,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  salt: string;

  @IsNotEmpty()
  role: 'admin' | 'normal';
}
