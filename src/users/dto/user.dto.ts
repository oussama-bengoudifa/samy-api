import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  phone: string;

  @Expose()
  binance_private_key: string;

  @Expose()
  binance_public_key: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
