import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { GestoriasModule } from './gestorias/gestorias.module';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => AuthModule)
  },
  {
    path: 'gestorias',
    loadChildren: () => import('./gestorias/gestorias.module').then(m => GestoriasModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
