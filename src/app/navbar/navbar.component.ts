import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {UserDetails} from '../model/user-details.model';
import {HttpClient} from '@angular/common/http';
import {exhaustMap, take} from 'rxjs/operators';
import {User} from '../model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  userDetails = {};

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(response => {
      this.isAuthenticated = !!response;
      this.userDetails = response;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
