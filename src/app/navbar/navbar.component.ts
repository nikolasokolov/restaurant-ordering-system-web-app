import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {User} from '../authentication/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private loggedInUser: Subscription;
  loggedInUserUsername = null;
  loggedUser = {
    username: null,
    token: null,
  };

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loggedInUser = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.loggedUser = user;
        this.loggedInUserUsername = user.username;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.loggedInUser.unsubscribe();
  }

}
