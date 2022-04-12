import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

const routes : Routes =
[{
  path: '',
  component: MainComponent,
  children:
  [{
    path: '',
    component: LoginComponent
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
