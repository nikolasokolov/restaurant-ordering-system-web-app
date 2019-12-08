import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {UserService} from '../user-service';
import {UserAccount} from '../../model/user-account-model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  isLoading = false;
  error = null;
  userAddedSuccessfully = false;
  authority = 'ROLE_USER';
  authorities: Array<string> = ['ROLE_USER', 'ROLE_ADMIN'];

  constructor(private location: Location, private userService: UserService) { }

  ngOnInit() {
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
    if (username.value < 6 || email.value < 8 || newPassword.value < 6 || confirmPassword.value < 6) {
      this.error = 'All field should be at least 6 characters';
    } else if (newPassword !== confirmPassword) {
      this.error = 'Passwords doesn\'t match';
      this.isLoading = false;
    } else {
      const userAccount = new UserAccount(username, email, newPassword, confirmPassword, authority);
      this.userService.addUser(userAccount).subscribe(() => {
        this.isLoading = false;
        this.userAddedSuccessfully = true;
      }, (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = 'An error occurred trying to create a new user';
      });
    }
  }
}
