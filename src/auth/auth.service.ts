import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    const passwordMatches = await argon2.verify(user.password, password);

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id);
    return tokens;
  }

  async getTokens(userId: number) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: `${process.env.JWT_ACCESS_SECRET}`,
          expiresIn: '30d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: `${process.env.JWT_REFRESH_SECRET}`,
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken(userId: number) {
    const user = await this.usersService.findOne(userId);
    const tokens = await this.getTokens(user?.id);
    return tokens;
  }
}
