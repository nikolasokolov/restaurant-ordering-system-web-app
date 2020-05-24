export class ChangePassword {
  public username: string;
  public oldPassword: string;
  public password: string;
  public confirmPassword: string;

  constructor(username: string, currentPassword: string, newPassword: string, confirmPassword: string) {
    this.username = username;
    this.oldPassword = currentPassword;
    this.password = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
