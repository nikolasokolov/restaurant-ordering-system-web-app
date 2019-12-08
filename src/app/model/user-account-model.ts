export class UserAccount {
  public username: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public authority: string;
  public companyId: number;

  constructor(username: string, email: string, password: string, confirmPassword: string,
              authority: string, companyId?: number) {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
    this.authority = authority;
    this.companyId = companyId;
  }
}
