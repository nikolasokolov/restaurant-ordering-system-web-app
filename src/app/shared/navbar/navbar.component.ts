import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {UserDetails} from '../../model/user-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  userDetails: UserDetails;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.userDetails.subscribe(userDetailsResponse => {
      this.isAuthenticated = !!userDetailsResponse;
      this.userDetails = userDetailsResponse;
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
