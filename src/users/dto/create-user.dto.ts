import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  binance_public_key: string;

  @IsOptional()
  binance_private_key: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
