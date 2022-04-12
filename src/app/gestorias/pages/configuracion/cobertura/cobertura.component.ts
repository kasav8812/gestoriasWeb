import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styles: [
  ]
})
export class CoberturaComponent implements OnInit {

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
        title: 'Crea Cobertura',
        button: 'Crear',
        tipe: 1,
        catid: 7,
        req: {id:null}
      }
    })
  }

}
