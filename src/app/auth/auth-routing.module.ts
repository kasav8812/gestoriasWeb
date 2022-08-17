import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { recuperarCuentaComponent } from './pages/recuperarCuenta/recuperarCuenta.component';
import { reestablecerComponent } from './pages/reestablecer/reestablecer.component';
const routes : Routes =
[{
  path: '',
  component: MainComponent,
  children:
  [{
    path: '',
    component: LoginComponent
  },
  {
    path:'recuperarCuenta',
    component: recuperarCuentaComponent
  },
  {
    path:'reestablecer',
    component: reestablecerComponent
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
