import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Subscription} from 'rxjs';
import {UserDetails} from '../model/user-details.model';
import {HttpClient} from '@angular/common/http';

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
  companyName = '';

  constructor(private authenticationService: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.loggedInUser = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.loggedUser = user;
        this.loggedInUserUsername = user.username;
        this.getUser();
      }
    });
    this.companyName = localStorage.getItem('userCompanyName');
  }

  logout() {
    this.authenticationService.logout();
  }

  getUser() {
    return this.httpClient.get<UserDetails>('https://localhost:8080/account').subscribe(response => {
      localStorage.setItem('userCompanyName', response.company.name);
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.loggedInUser.unsubscribe();
  }

}
