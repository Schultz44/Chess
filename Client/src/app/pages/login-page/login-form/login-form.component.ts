import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(private formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    console.log(this.loginForm);
  }
  onSubmit(): void {
    console.log(this.loginForm);
  }
  l(s) {
    console.log(s);
  }
}
