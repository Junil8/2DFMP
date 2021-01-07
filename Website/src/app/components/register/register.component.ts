import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CustomValidator } from '../../validators/CustomValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ], [
        CustomValidator.emailAvailable(this.api)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ], [
        CustomValidator.usernameAvailable(this.api)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]],
      passwordRetype: ['', [
        Validators.required
      ]]
    });

    this.passwordRetype.setValidators([CustomValidator.match(this.password)]);
  }

  get email() { return this.form.get('email') as AbstractControl; }
  get username() { return this.form.get('username') as AbstractControl; }
  get password() { return this.form.get('password') as AbstractControl; }
  get passwordRetype() { return this.form.get('passwordRetype') as AbstractControl; }

  async onSubmit() {
    try {
      let created = await this.api.createUser(this.email.value, this.username.value, this.password.value);
      
      if (created.error) this.error = true;
      else this.router.navigate(['/']);
    } catch(e) {
      this.error = true;
    }
  }

}
