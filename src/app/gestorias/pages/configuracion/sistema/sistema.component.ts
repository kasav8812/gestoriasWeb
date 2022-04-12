import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styles: [
  ]
})
export class SistemaComponent implements OnInit {

  area: Catalogo[];

  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  enabledCat(item){

  }

  edit(item){

  }

  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Sistema',
        button: 'Crear',
        tipe: 1,
        catid: 4,
        req: {id:null}
      }
    })
  }

}
