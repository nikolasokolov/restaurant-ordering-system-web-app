import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationResponseData} from '../model/authentication-response-data.model';
import {UserDetails} from '../model/user-details.model';
import {Company} from '../model/company.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  user = new BehaviorSubject<User>(this.isAuthenticated());
  userDetails = new BehaviorSubject<UserDetails>(this.getUserDetails());
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(username: string, password: string) {
    const credentials = {username, password};
    return this.httpClient.post<AuthenticationResponseData>('https://localhost:8080/authenticate', credentials)
      .pipe(tap(response => {
        this.handleAuthentication(
          response.username,
          response.token,
          +response.expiresIn
        );
      })
    ).pipe(switchMap(() => this.getUser()));
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'));
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

  getUser() {
    return this.httpClient.get<UserDetails>('https://localhost:8080/api/account')
      .pipe(tap(response => {
      this.handleUserDetails(response.id, response.username, response.password, response.email,
        response.authorities, response.company);
    }));
  }

  handleUserDetails(id: number, username: string, password: string, email: string, authorities: any[], company: Company) {
    const userDetails = new UserDetails(id, username, password, email, authorities, company);
    this.userDetails.next(userDetails);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.userDetails.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('restaurantAccount');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/authenticate']);
  }
}
