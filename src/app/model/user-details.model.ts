import {Company} from './company.model';

export class UserDetails {
  public id: number;
  public username: string;
  public password: string;
  public email: string;
  public authorities: any[];
  public company: Company;

  constructor(id: number, username: string, password: string, email: string, authorities: any[], company: Company) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.authorities = authorities;
    this.company = company;
  }
}
