import { Body, Controller, Get, Post, HttpCode, HttpStatus, Res, UseGuards, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { accessToken, user } = await this.loginUseCase.execute(loginDto);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return response.send(user);
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('Authentication');
    return response.status(HttpStatus.OK).json({ message: 'Sesión cerrada' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}