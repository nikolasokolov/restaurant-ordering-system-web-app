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
  private userSub: Subscription;
  isAuthenticated = false;
  userDetails = {};

  constructor(private authenticationService: AuthenticationService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.userSub = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    if (this.isAuthenticated) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      console.log(this.userDetails);
    }
  }

  logout() {
    this.authenticationService.logout();
  }

}
