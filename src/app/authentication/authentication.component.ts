import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from './user.model';
import {BehaviorSubject} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoading = false;
  error = null;
  isAuthenticated = false;

  constructor(private httpClient: HttpClient, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  authenticate(authenticationForm: NgForm) {
    this.isLoading = true;
    const username = authenticationForm.value.username;
    const password = authenticationForm.value.password;
    this.authenticationService.authenticate(username, password).subscribe(response => {
      this.isLoading = false;
      this.isAuthenticated = true;
    }, error => {
      this.isLoading = false;
      this.error = 'Incorrect credentials';
    });
  }

}
