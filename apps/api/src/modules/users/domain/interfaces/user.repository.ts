import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByReferralCode(code: string): Promise<User | null>;
}