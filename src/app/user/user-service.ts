import {Injectable} from '@angular/core';
import {UserAccount} from '../model/user-account-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  USERS_BASE_URL = 'https://localhost:8080/main/users';

  constructor(private httpClient: HttpClient) {}

  addUser(userAccount: UserAccount): Observable<any> {
    return this.httpClient.post(this.USERS_BASE_URL + '/add', userAccount);
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.USERS_BASE_URL + '/');
  }

  deleteUser(id: number) {
    return this.httpClient.delete(this.USERS_BASE_URL + '/delete/' + id);
  }

  getAllUsersForCompany(companyId: number): Observable<any> {
    return this.httpClient.get(this.USERS_BASE_URL + '/company/' + companyId);
  }
}
