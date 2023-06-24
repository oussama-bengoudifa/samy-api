import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshAccessToken(@CurrentUserId() userId: number) {
    return this.authService.refreshAccessToken(userId);
  }
}
