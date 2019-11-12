import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoading = false;
  error = null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  authenticate(authenticationForm: NgForm) {
    this.isLoading = true;
    const credentials = {
      usernameOrEmail: authenticationForm.value.usernameOrEmail,
      password: authenticationForm.value.password
    };
    this.httpClient.post('http://localhost:8080/api/authentication', credentials).subscribe(response => {
      this.isLoading = false;
      console.log('Successfully logged in');
      this.router.navigate(['/home']);
    }, error => {
      this.isLoading = false;
      this.error = 'Incorrect credentials, please try again.';
      console.log('Error occurred while trying to log in');
    });
  }

}
