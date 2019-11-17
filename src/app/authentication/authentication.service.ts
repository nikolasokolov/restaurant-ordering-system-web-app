import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface AuthResponseData {
  username: string;
  token: string;
  expiresIn: number;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  user = new BehaviorSubject<User>(this.isAuthenticated());
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(username: string, password: string) {
    const credentials = {username, password};
    return this.httpClient.post<AuthResponseData>('https://localhost:8080/authenticate', credentials)
      .pipe(tap(response => {
        this.handleAuthentication(
          response.username,
          response.token,
          +response.expiresIn
        );
      })
    );
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user'));
  }

  private handleAuthentication(username: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(username, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('Authorization', token);
    this.autoLogout(expiresIn * 1000);
    this.router.navigate(['/home']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('Authorization');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/authenticate']);
  }

  getUser() {
    this.httpClient.get('https://localhost:8080/account').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
