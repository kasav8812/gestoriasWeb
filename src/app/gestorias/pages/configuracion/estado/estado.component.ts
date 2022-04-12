import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { ConfiguracionService } from '../../services/configuracion.service';


@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styles: [
  ]
})
export class EstadoComponent implements OnInit {

  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }
  estado: Catalogo[];


  ngOnInit(): void {
    if (localStorage.getItem('estado') == null) {
      this.consumeInit();
    }else{
      this.estado = JSON.parse(localStorage.getItem('estado') )
    }
  }

  consumeInit(){
    this.configuracion.getEstadoRequerimiento().subscribe(
      resp => {
        this.estado = resp;
        localStorage.removeItem('estado');
        localStorage.setItem('estado', JSON.stringify(this.estado));
      }
    );
  }
  edit(item: Catalogo){
    console.log(item);
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Editar Estado Requerimiento',
        button: 'Editar',
        tipe: 2,
        catid: 1,
        req: item
      }
    })
  }
}
