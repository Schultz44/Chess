import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutes } from './login-page.routing';
import { LoginFormModule } from './login-form/login-form.module';
import { BasicInputModule } from 'src/shared/components/basic-input/basic-input.module';
import { ImageSvgModule } from 'src/shared/components/image-svg/image-svg.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutes,
    LoginFormModule,
    BasicInputModule,
    ImageSvgModule,
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
