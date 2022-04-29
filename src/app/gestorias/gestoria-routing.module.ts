import { RoleGuard } from './../guards/role.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidationGuard } from '../guards/validation.guard';
import { CrearComponent } from './pages/crear/crear.component';
import { MainComponent } from './pages/main/main.component';
import { RequerimientoComponent } from './pages/requerimiento/requerimiento.component';
import { ConfiguracionModule } from './pages/configuracion/configuracion.module';
import { RequerimientosModule } from './pages/requerimientos/requerimientos.module';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [ValidationGuard],
  children:
    [
      {
        path: 'requerimientos',
        loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => RequerimientosModule)
      },
      {
        path: 'requerimiento',
        component: RequerimientoComponent
      },
      {
        path: 'crear',
        component: CrearComponent
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => ConfiguracionModule),
        canActivate: [RoleGuard]
      },
      {
        path: '',
        redirectTo: 'requerimientos'
      },
      {
        path: '**',
        redirectTo: ''
      }

    ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestoriaRoutingModule { }
