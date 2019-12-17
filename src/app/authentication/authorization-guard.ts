import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { map, take } from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {UserDetails} from '../model/user-details.model';


@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
  private isAuthenticated = false;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authenticationService.userDetails.pipe(take(1), map(user => {
      const auth = !!user;
      if (auth) {
        const userAuthorities = user.authorities;
        return userAuthorities.includes('ROLE_SUPER_ADMIN') || userAuthorities.includes('ROLE_ADMIN');
      } else {
        return this.router.createUrlTree(['/home']);
      }
    }));
  }
}
