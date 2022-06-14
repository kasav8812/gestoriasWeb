import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearService } from '../../services/crear.service';

import Swal from 'sweetalert2';
import { UsuariosResponse } from '../../interfaces/crear.interface';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: [
  ]
})
export class CrearUsuarioComponent implements OnInit {
    usuarios: UsuariosResponse[];
    area: Catalogo[];

    constructor(private configuracion: ConfiguracionService,
        public dialog: MatDialog, private creaService: CrearService,private router: Router,private fb: FormBuilder) { }
    
      ngOnInit(): void {
        this.creaService.getAllUsers().subscribe(
          response => {
            this.usuarios = response;
            console.log(this.usuarios[0].role);
          },
          error => {
            console.log(error);
          }
        )

        this.configuracion.getAreaSolicitante().subscribe(
          response => {
            this.area = response;
          },
          error => {
    
          }
        );
      }

     

      create(){
        const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            data: {
              tipo: 8,
              req: ""
            }
          })
    }
}