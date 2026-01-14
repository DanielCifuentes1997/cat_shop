export abstract class TokenService {
  abstract sign(payload: any): string;
}