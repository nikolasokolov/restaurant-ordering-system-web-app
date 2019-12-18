import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationResponseData} from '../model/authentication-response-data.model';
import {UserDetails} from '../model/user-details.model';
import {Company} from '../model/company.model';
import {RestaurantItem} from '../model/restaurant-item.model';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  user = new BehaviorSubject<User>(this.isAuthenticated());
  userDetails = new BehaviorSubject<UserDetails>(this.getUserDetails());
  restaurants = new BehaviorSubject<RestaurantItem[]>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router, private sanitizer: DomSanitizer) {}

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
    ).pipe(switchMap(() => this.getUser()))
      .pipe(switchMap(() => this.getUserRestaurants()));
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'));
  }

  private handleAuthentication(username: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, token, expirationDate.toUTCString());
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
    this.restaurants.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('userDetails');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/authenticate']);
  }

  autoLogin() {
    const user: { username: string; token: string; expirationDate: string; } =
      JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }

    const userDetails: {
      id: number, username: string; password: string, email: string; authorities: any[]; company: Company
    } = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails) {
      return;
    }

    const loadedUser = new User(user.username, user.token, user.expirationDate);
    const loadedUserDetails = new UserDetails(userDetails.id, userDetails.username, userDetails.password, userDetails.email,
      userDetails.authorities, userDetails.company);

    if (loadedUser.token) {
      const expirationDuration = new Date(user.expirationDate).getTime() - new Date().getTime();
      if (expirationDuration > 1000) {
        this.user.next(loadedUser);
        this.userDetails.next(loadedUserDetails);
        this.autoLogout(expirationDuration);
      } else {
        localStorage.clear();
      }
    }
  }

  getUserRestaurants() {
    const userDetails = this.getUserDetails();
    const userId = userDetails.id;
    if (!(userDetails.authorities.includes('ROLE_RESTAURANT') || userDetails.authorities.includes('ROLE_SUPER_ADMIN'))) {
      return this.httpClient.get('https://localhost:8080/main/user/' + userId + '/restaurants')
        .pipe(tap((response: any[]) => {
          this.restaurants.next(response);
          for (const restaurantItem of response) {
            const objectURL = 'data:image/jpeg;base64,' + restaurantItem.logo;
            restaurantItem.logoImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
      }));
    }
  }

}
