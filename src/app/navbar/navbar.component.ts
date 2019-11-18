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
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  loggedUserDetails: UserDetails;
  userSub: Subscription;

  constructor(private authenticationService: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.userSub = this.authenticationService.user.subscribe(response => {
      if (response !== null) {
        this.isAuthenticated = true;
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
}
