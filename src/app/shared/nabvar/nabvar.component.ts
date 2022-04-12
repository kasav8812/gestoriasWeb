import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { BuscarService } from '../services/buscar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styles: [
    `
    .bd-subnavbar{
      background-color: rgba(255,255,255,0.95);
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 15%);
    }
    input{
      border: 1px solid #ced4da !important;
      border-top-left-radius: 1em !important;
      border-bottom-left-radius: 1em !important;

      10px !important
    }
    button{
      border-top-right-radius: 1em;
      border-bottom-right-radius: 1em;
      border:1px solid #ced4da;
    }
    .btn-outline-secondary:hover{
      background: #fff;
    }


    `
  ]
})
export class NabvarComponent implements OnInit {

  token: any;
  username: any;
  dtoReque: any;
  buscarForm: FormGroup = this.formBuilder.group({
    buscar: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private buscarService: BuscarService
    ) {
    this.token = sessionStorage.getItem('token');
   }

  ngOnInit(): void {
    let tk = JSON.parse(atob(this.token.split('.')[1]));
    this.username = tk.name;
  }

  cerrarSesion(){
    sessionStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }

  buscar(){

    if(this.buscarForm.valid){
      this.buscarService.buscar(this.buscarForm.value.buscar).subscribe(
        response => {
          this.dtoReque = response;
          const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            data: { 
              title: "Datos del requerimiento",
              tipo: 2,
              array: this.dtoReque,
              boton: "Aceptar"
            }
          })
        },
        error => {
          console.log(error);
        }
      )
    }else {
      Swal.fire(
        'Advertencia',
        'Ingrese un número de requerimiento válido',
        'warning'
      )
    }

  }

  inicio(){
    this.router.navigateByUrl('/gestorias/requerimientos');
  }
}
