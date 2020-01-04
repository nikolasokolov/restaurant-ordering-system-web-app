import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChangePassword} from '../model/change-password.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChangePasswordService {
  constructor(private httpClient: HttpClient) {
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/users/change-password', changePassword);
  }

}
