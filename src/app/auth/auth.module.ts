import { InterceptorService } from './pages/services/interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [MainComponent, LoginComponent, SpinnerComponent],
  exports: [MainComponent, SpinnerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],

})
export class AuthModule { }
