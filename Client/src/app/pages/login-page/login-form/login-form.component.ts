import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: false
})
export class LoginFormComponent {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(private formBuilder: UntypedFormBuilder) {
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
