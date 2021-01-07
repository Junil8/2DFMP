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

  private async validPassword(password: string): Promise<boolean> {
    try {
      let user = await this.api.getUser();
      let hash = await this.api.encrypt({string: password, salt: user.password_salt});

      return hash.cypher === user.password;
    } catch(e) {
      return false;
    }
  }

  private async relogin(email: string, password: string) {
    let auth = await this.api.login(email, password);
    this.auth.setAuthentication(auth);
  }

  private refresh() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  async onSubmitNewUsername() {
    let validPassword = await this.validPassword(this.passwordForNewUsername.value);
    if (!validPassword) {
      this.errorNewUsername = true;
      return;
    }

    try {
      let user = await this.api.getUser();
      let updated = await this.api.updateUser({newUsername: this.newUsername.value});

      if (!updated.error) {
        this.relogin(user.email_address, this.passwordForNewUsername.value);
        this.refresh();
      } else {
        this.errorNewUsername = true;
      }
    } catch(e) {
      this.errorNewUsername = true;
    }
  }

  async onSubmitNewPassword() {
    let validPassword = await this.validPassword(this.passwordForNewPassword.value);
    if (!validPassword) {
      this.errorNewPassword = true;
      return;
    }

    try {
      let user = await this.api.getUser();
      let updated = await this.api.updateUser({newPassword: this.newPassword.value});
      
      if (!updated.error) {
        this.relogin(user.email_address, this.newPassword.value);
        this.refresh();
      } else {
        this.errorNewPassword = true;
      }
    } catch(e) {
      this.errorNewPassword = true;
    }
  }

  async onSubmitDelete() {
    let validPassword = await this.validPassword(this.passwordForDelete.value);
    if (!validPassword) {
      this.errorDelete = true;
      return;
    }

    try {
      let deleted = await this.api.deleteUser();
      
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
