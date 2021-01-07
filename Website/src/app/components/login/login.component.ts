import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
      ]]
    });

    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/game']);
    }
  }

  get email() { return this.form.get('email') as AbstractControl; }
  get password() { return this.form.get('password') as AbstractControl; }

  async onSubmit() {
    try {
      let auth = await this.api.login(this.email.value, this.password.value);

      this.auth.setAuthentication(auth);
      this.router.navigate(['/game']);
    } catch(e) {
      this.error = true;
    }
  }

}
