import {Injectable} from '@angular/core';
import {UserAccount} from '../model/user-account-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  addUser(userAccount: UserAccount): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/users/add', userAccount);
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get('https://localhost:8080/main/users/');
  }
}
