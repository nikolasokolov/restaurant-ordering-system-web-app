export class Users {
  public id: number;
  public username: string;
  public password: string;
  public email: string;
  public authority: string;
  public company: string;

  constructor(id: number, username: string, password: string, email: string, authority: string, company: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.authority = authority;
    this.company = company;
  }
}
