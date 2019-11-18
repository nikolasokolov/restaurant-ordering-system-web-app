import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UserDetails} from '../model/user-details.model';
import {HttpClient} from '@angular/common/http';
import {exhaustMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  loggedUserDetails = {};
  private userSub: Subscription;

  constructor(private authenticationService: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.userSub = this.authenticationService.user.subscribe(user => {
      if (user !== null) {
        this.isAuthenticated = !!user;
        this.getUser();
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  getUser() {
    return this.httpClient.get<UserDetails>('https://localhost:8080/api/account').subscribe(response => {
      const userDetails = new UserDetails(response.id, response.username, response.password,
        response.email, response.authorities, response.company);
      this.loggedUserDetails = userDetails;
      if (userDetails !== null) {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
