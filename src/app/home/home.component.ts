import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testApi = null;
  testApiSuccess = true;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  test() {
    this.httpClient.get('https://localhost:8080/api/test').subscribe(response => {
      console.log('success');
      this.testApi = 'Successfully received response from test api';
    }, error => {
      console.log('error');
      this.testApi = 'Error occurred during execution of test api';
      this.testApiSuccess = false;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
