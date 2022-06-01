import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainComponent } from './main/main.component';
import { EstadoComponent } from './estado/estado.component';
import { UnidadmedidaComponent } from './unidadmedida/unidadmedida.component';
import { AreasolicitanteComponent } from './areasolicitante/areasolicitante.component';
import { TipoPermisoComponent } from './tipo-permiso/tipo-permiso.component';
import { SistemaComponent } from './sistema/sistema.component';
import { TipoSolicitudComponent } from './tipo-solicitud/tipo-solicitud.component';
import { CoberturaComponent } from './cobertura/cobertura.component';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

import { RoleGuard } from 'src/app/guards/role.guard';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: '',
        component: EstadoComponent
      }, {
        path: 'estadorequerimineto',
        component: EstadoComponent
      }, {
        path: 'unidadMedida',
        component: UnidadmedidaComponent
      }, {
        path: 'areaSolictante',
        component: AreasolicitanteComponent
      }, {
        path: 'tipoPermiso',
        component: TipoPermisoComponent
      }, {
        path: 'sistema',
        component: SistemaComponent
      },{
        path: 'tipoSolicitud',
        component: TipoSolicitudComponent
      },{
        path: 'cobertura',
        component: CoberturaComponent
      },{
        path: 'tipoDeActividad',
        component: TipoActividadComponent
      },{
        path: 'crearUsuario',
        component: CrearUsuarioComponent
      },{
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
