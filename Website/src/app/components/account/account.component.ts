import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CustomValidator } from 'src/app/validators/CustomValidator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  formNewUsername: FormGroup;
  formNewPassword: FormGroup;
  formDelete: FormGroup;
  username: string;
  errorNewUsername: boolean;
  errorNewPassword: boolean;
  errorDelete: boolean;

  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.formNewUsername = this.formBuilder.group({
      newUsername: ['', [
        Validators.required,
        Validators.minLength(4)
      ], [
        CustomValidator.usernameAvailable(this.api)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]]
    });

    this.formNewPassword = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]],
      newPasswordRetype: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]]
    });

    this.newPasswordRetype.setValidators([CustomValidator.match(this.newPassword)]);

    this.formDelete = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]]
    });

    this.setUsername();
  }

  private async relogin(email: string, password: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(async () => {
      let auth = await this.api.login(email, password);
      this.auth.setAuthentication(auth);

      this.router.navigate(['/account']);
    });
  }

  async setUsername() {
    let user = await this.api.getUser();
    this.username = user.username;
  }
  
  get newUsername() { return this.formNewUsername.get('newUsername') as AbstractControl; }
  get newPassword() { return this.formNewPassword.get('newPassword') as AbstractControl; }
  get newPasswordRetype() { return this.formNewPassword.get('newPasswordRetype') as AbstractControl; }

  get passwordForNewUsername() { return this.formNewUsername.get('password') as AbstractControl; }
  get passwordForNewPassword() { return this.formNewPassword.get('password') as AbstractControl; }
  get passwordForDelete() { return this.formDelete.get('password') as AbstractControl; }

  async onSubmitNewUsername() {
    try {
      let user = await this.api.getUser();
      let updated = await this.api.updateUser({new_username: this.newUsername.value, password: this.passwordForNewUsername.value});

      if (!updated.error) {
        this.relogin(user.email_address, this.passwordForNewUsername.value);
      } else {
        this.errorNewUsername = true;
      }
    } catch(e) {
      this.errorNewUsername = true;
    }
  }

  async onSubmitNewPassword() {
    try {
      let user = await this.api.getUser();
      let updated = await this.api.updateUser({new_password: this.newPassword.value, password: this.passwordForNewPassword.value});
      
      if (!updated.error) {
        this.relogin(user.email_address, this.newPassword.value);
      } else {
        this.errorNewPassword = true;
      }
    } catch(e) {
      this.errorNewPassword = true;
    }
  }

  async onSubmitDelete() {
    try {
      let deleted = await this.api.deleteUser({password: this.passwordForDelete.value});
      
      if (!deleted.error) {
        this.auth.clearAuthentication();
        this.router.navigate(['/']);
      } else {
        this.errorDelete = true;
      }
    } catch(e) {
      this.errorDelete = true;
    }
  }

}
