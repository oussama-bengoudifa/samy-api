import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  binance_public_key: string;

  @IsOptional()
  @IsString()
  binance_private_key: string;
}
