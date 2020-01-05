import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {UserService} from '../user-service';
import {UserAccount} from '../../model/user-account-model';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  isLoading = false;
  error = null;
  authority = 'ROLE_USER';
  authorities: Array<string> = ['ROLE_USER', 'ROLE_ADMIN'];
  companyId = null;
  alert = new Subject<string>();
  alertMessage: string;

  constructor(private location: Location, private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if (id !== undefined) {
      this.companyId = id;
    }
    this.alert.subscribe((message) => this.alertMessage = message);
    this.alert.pipe(debounceTime(2500)).subscribe(() => this.alertMessage = null);
  }

  changeMessage(message: string) {
    this.alert.next(message);
  }

  goBack() {
    this.location.back();
  }

  changeAuthority(authority: string) {
    this.authority = authority;
  }

  addUser(addUserForm: NgForm) {
    this.isLoading = true;
    const username = addUserForm.value.username;
    const email = addUserForm.value.email;
    const authority = addUserForm.value.authority;
    const newPassword = addUserForm.value.newPassword;
    const confirmPassword = addUserForm.value.confirmPassword;
    const companyId = this.companyId === undefined ? null : this.companyId;
    if (username.value < 6 || email.value < 8 || newPassword.value < 6 || confirmPassword.value < 6) {
      this.error = 'All field should be at least 6 characters';
    } else if (newPassword !== confirmPassword) {
      this.error = 'Passwords doesn\'t match';
      this.isLoading = false;
    } else {
      let userAccount;
      if (companyId !== null) {
        userAccount = new UserAccount(username, email, newPassword, confirmPassword, authority, companyId);
      } else {
        userAccount = new UserAccount(username, email, newPassword, confirmPassword, authority);
      }
      this.userService.addUser(userAccount).subscribe(() => {
        this.isLoading = false;
        this.changeMessage('User added successfully');
      }, () => {
        this.isLoading = false;
        this.error = 'An error occurred trying to create a new user';
      });
    }
  }
}
