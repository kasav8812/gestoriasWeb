import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './pages/main/main.component';
import { RequerimientoComponent } from './pages/requerimiento/requerimiento.component';
import { ReactivarComponent } from './pages/reactivar/reactivar.component';
import { GestoriaRoutingModule } from './gestoria-routing.module';
import { CrearComponent } from './pages/crear/crear.component';
import { SharedModule } from '../shared/nabvar/shared.module';
import { DtosRequerimientoComponent } from './pages/components/dtos-requerimiento/dtos-requerimiento.component';
import { InfoAdicionalComponent } from './pages/components/info-adicional/info-adicional.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './dialogs/alert.component';
import { MaterialModule } from '../material-module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    MainComponent,
    RequerimientoComponent,
    ReactivarComponent,
    CrearComponent,
    DtosRequerimientoComponent,
    InfoAdicionalComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    GestoriaRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AuthModule
  ],
  exports: [MainComponent, ]
})
export class GestoriasModule { }
