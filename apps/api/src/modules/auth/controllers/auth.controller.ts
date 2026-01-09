import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { accessToken, user } = await this.authService.login(loginDto);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, 
    });

    return response.send(user);
  }
}