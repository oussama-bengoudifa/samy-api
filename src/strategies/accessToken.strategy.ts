import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

type JwtPayload = {
  sub: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const userId = payload.sub ? payload.sub : null;

    const user = await this.userService.findOne(userId);

    if (user?.id === userId) {
      return { userId };
    } else return false;
  }
}
