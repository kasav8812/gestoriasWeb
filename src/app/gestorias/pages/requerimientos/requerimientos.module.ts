import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequerimientosRoutingModule } from './requerimientos-routing.module';
import { MainComponent } from './main/main.component';
import { EnCursoComponent } from './en-curso/en-curso.component';
import { RecibidasComponent } from './recibidas/recibidas.component';
import { PorAutorizarComponent } from './por-autorizar/por-autorizar.component';
import { CerradasComponent } from './cerradas/cerradas.component';
import { AutorizadasComponent } from './autorizadas/autorizadas.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { CanceladasComponent } from './canceladas/canceladas.component';


@NgModule({
  declarations: [MainComponent, EnCursoComponent, RecibidasComponent, PorAutorizarComponent, CerradasComponent, AutorizadasComponent, DocumentacionComponent, CanceladasComponent],
  imports: [
    CommonModule,
    RequerimientosRoutingModule
  ]
})
export class RequerimientosModule { }
