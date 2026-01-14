import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { EncryptionService } from '../../domain/interfaces/encryption.service.interface';
import { TokenService } from '../../domain/interfaces/token.service.interface';
import type { UserRepository } from '../../../users/domain/interfaces/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('EncryptionService') private readonly encryptionService: EncryptionService,
    @Inject('TokenService') private readonly tokenService: TokenService,
  ) {}

  async execute(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await this.encryptionService.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = this.tokenService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}