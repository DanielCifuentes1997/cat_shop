import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EncryptionService } from '../../domain/interfaces/encryption.service.interface';

@Injectable()
export class BcryptAdapter implements EncryptionService {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}