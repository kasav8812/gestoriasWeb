import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizadasComponent } from './autorizadas/autorizadas.component';
import { CanceladasComponent } from './canceladas/canceladas.component';
import { CerradasComponent } from './cerradas/cerradas.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { EnCursoComponent } from './en-curso/en-curso.component';
import { MainComponent } from './main/main.component';
import { PorAutorizarComponent } from './por-autorizar/por-autorizar.component';
import { RecibidasComponent } from './recibidas/recibidas.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: EnCursoComponent
      },
      {
        path: 'encurso',
        component: EnCursoComponent
      },
      {
        path: 'recibidas',
        component: RecibidasComponent
      },
      {
        path: 'porAutorizar',
        component: PorAutorizarComponent
      },
      {
        path: 'cerradas',
        component: CerradasComponent
      },
      {
        path: 'autorizadas',
        component: AutorizadasComponent
      },
      {
        path: 'documentacion',
        component: DocumentacionComponent
      },
      {
        path: 'canceladas',
        component: CanceladasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequerimientosRoutingModule { }
