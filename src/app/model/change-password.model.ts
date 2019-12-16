export class ChangePassword {
  public username: string;
  public currentPassword: string;
  public newPassword: string;
  public confirmPassword: string;

  constructor(username: string, currentPassword: string, newPassword: string, confirmPassword: string) {
    this.username = username;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
