import { InterceptorService } from './pages/services/interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';
import { RecibidasComponent } from '../gestorias/pages/requerimientos/recibidas/recibidas.component';
import { recuperarCuentaComponent } from './pages/recuperarCuenta/recuperarCuenta.component';
import { reestablecerComponent } from './pages/reestablecer/reestablecer.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [MainComponent, LoginComponent, SpinnerComponent, recuperarCuentaComponent,reestablecerComponent],
  exports: [MainComponent, SpinnerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],

})
export class AuthModule { }
