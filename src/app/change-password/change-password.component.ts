import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ChangePasswordService} from './change-password.service';
import {ChangePassword} from '../model/change-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isLoading = false;
  error = null;
  passwordSuccessfullyChanged = false;

  constructor(private changePasswordService: ChangePasswordService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  changePassword(changePasswordForm: NgForm) {
    this.isLoading = true;
    const username = changePasswordForm.value.username;
    const currentPassword = changePasswordForm.value.currentPassword;
    const newPassword = changePasswordForm.value.newPassword;
    const confirmPassword = changePasswordForm.value.confirmPassword;
    if (username.value < 6 || currentPassword.value < 6 || newPassword.value < 6 || confirmPassword.value < 6) {
      this.error = 'All field should be at least 6 characters';
    } else if (newPassword !== confirmPassword) {
      this.error = 'Passwords doesn\'t match';
      this.isLoading = false;
    } else {
      const changePassword = new ChangePassword(username, currentPassword, newPassword, confirmPassword);
      this.changePasswordService.changePassword(changePassword).subscribe(() => {
        this.isLoading = false;
        this.passwordSuccessfullyChanged = true;
      }, () => {
        this.isLoading = false;
        this.error = 'Incorrect credentials';
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
