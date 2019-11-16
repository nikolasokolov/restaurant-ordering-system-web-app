import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(username: string, password: string) {
    const credentials = {username, password};
    return this.httpClient.post<User>('https://localhost:8080/authenticate', credentials)
      .pipe(catchError(this.handleError), tap(response => {
        this.handleAuthentication(
          response.username,
          response.token,
        );
      })
    );
  }

  private handleAuthentication(username: string, token: string) {
    const user = new User(username, token);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('Authorization', token);
    this.router.navigate(['/home']);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/authentication']);
    localStorage.removeItem('user');
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
