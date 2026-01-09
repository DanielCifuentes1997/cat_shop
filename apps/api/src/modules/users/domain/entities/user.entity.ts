export class User {
  constructor(
    public id: string,
    public email: string,
    public referralCode: string,
    public referredBy: string | null,
    public createdAt: Date,
  ) {}
}