import {Company} from './company.model';

export interface UserDetails {
  id: number;
  username: string;
  password: string;
  email: string;
  authorities: any[];
  company: Company;
}
