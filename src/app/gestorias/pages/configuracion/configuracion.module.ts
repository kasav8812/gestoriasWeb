import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { MainComponent } from './main/main.component';
import { EstadoComponent } from './estado/estado.component';
import { UnidadmedidaComponent } from './unidadmedida/unidadmedida.component';
import { AreasolicitanteComponent } from './areasolicitante/areasolicitante.component';
import { TipoPermisoComponent } from './tipo-permiso/tipo-permiso.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SistemaComponent } from './sistema/sistema.component';
import { TipoSolicitudComponent } from './tipo-solicitud/tipo-solicitud.component';
import { CoberturaComponent } from './cobertura/cobertura.component';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';


@NgModule({
  declarations: [MainComponent, EstadoComponent, UnidadmedidaComponent, AreasolicitanteComponent, TipoPermisoComponent, SistemaComponent, TipoSolicitudComponent, CoberturaComponent, TipoActividadComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    MatSlideToggleModule
  ],
  exports:[MainComponent]
})
export class ConfiguracionModule { }
