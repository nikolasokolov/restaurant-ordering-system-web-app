import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('Authorization');
    return this.authenticationService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          headers: request.headers.set('Authorization', token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
