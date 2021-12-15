import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicInputModule } from 'src/shared/components/basic-input/basic-input.module';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [ReactiveFormsModule, BasicInputModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
