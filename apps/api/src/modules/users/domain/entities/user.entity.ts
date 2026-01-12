export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly referralCode: string,
    public readonly referredBy: string | null,
    public readonly createdAt: Date,
  ) {}
}