import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoading = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  authenticate(authenticationForm: NgForm) {
    this.isLoading = true;
    const credentials = {
      usernameOrEmail: authenticationForm.value.email,
      password: authenticationForm.value.password
    };
    this.httpClient.post('http://localhost:8080/api/auth/signin', credentials).subscribe(response => {
      this.isLoading = false;
      console.log('Successfully logged in');
    }, error => {
      this.isLoading = false;
      console.log('Error occurred while trying to log in');
    });
  }

}
