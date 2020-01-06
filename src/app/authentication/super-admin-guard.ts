import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root' })
export class SuperAdminGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authenticationService.userDetails.pipe(take(1), map(user => {
      const auth = !!user;
      if (auth) {
        const userAuthorities = user.authorities;
        return userAuthorities.includes('ROLE_SUPER_ADMIN');
      } else {
        return this.router.createUrlTree(['/home']);
      }
    }));
  }
}
