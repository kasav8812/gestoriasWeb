import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { CrearService } from '../../services/crear.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../dialogs/alert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  token: any;
  rol: any;
  requerimientos: CrearResponse[];
  tam:any=0;

  requerimientosVencidos: CrearResponse[];
  tamVencidos:any=0;

  constructor(
    private requeServvice: CrearService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }


   ngOnInit(): void {
     if(this.rol === "ROLE_CONFIGURACION"){
      this.router.navigateByUrl('/gestorias/configuracion');
     }
     localStorage.clear();

     this.requeServvice.getRequeriminetoPorVencer().subscribe(
        response => {
          this.requerimientos = response;
          console.log("Estos son los requerimientos por vencer--",this.requerimientos);
          this.tam=this.requerimientos.length;
        },
        error => {
          console.log(error);
        }
      )

     this.requeServvice.getRequeriminetosVencidos().subscribe(
        response => {
          this.requerimientosVencidos = response;
          console.log("Estos son los requerimientos vencidos--",this.requerimientos);
          this.tamVencidos=this.requerimientosVencidos.length;
        },
        error => {
          console.log(error);
        }
      )
   }
   mostrarLista(){
    const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            data: {
              tipo: 4,
              title: "Requerimientos por vencer",
              array: this.requerimientos,
              boton: "Cerrar"
            }
          })
   }
   mostrarListaVencidos(){
    const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            data: {
              tipo: 4,
              title: "Requerimientos vencidos",
              array: this.requerimientosVencidos,
              boton: "Cerrar"
            }
          })
   }
}
