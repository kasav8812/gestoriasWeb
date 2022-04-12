import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styles: [
  ]
})
export class TipoActividadComponent implements OnInit {

  actividad: Catalogo[];

  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }

    ngOnInit(): void {
      this.configuracion.disparadorActualizar.subscribe(
        response => {
          this.consumeInit();
      })
      if (localStorage.getItem('actividad') == null) {
        this.consumeInit();
      }else{
        this.actividad = JSON.parse(localStorage.getItem('actividad') )
      }
    }

    consumeInit(){
      this.configuracion.getTipoActividad().subscribe(
        resp => {
          this.actividad = resp;
          localStorage.removeItem('actividad');
          localStorage.setItem('actividad', JSON.stringify(this.actividad));
        }
      );
    }

  enabledCat(item){
    let cat ={
      activo: item.enabled?0:1,
      id: item.id,
    }
    if(item.enabled == true){
      Swal.fire({
        title: '¿Esta seguro que desea desactivar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoActiviad(cat);
          Swal.fire(
            'Desactivada',
            'Se desactivo correctamente',
            'success'
          )
        }
      })
    }else {
      Swal.fire({
        title: '¿Esta seguro que desea activar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoActiviad(cat);
          Swal.fire(
            'Activada',
            'Se activo correctamente',
            'success'
          )
        }
      })
    }
    this.ngOnInit();
  }

  tipoActiviad(cat: any){
    this.configuracion.putTipoActividad(cat).subscribe(
      resp => {
        this.consumeInit();
      }
    )
  }

  edit(item){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Editar Unidad Medida',
        button: 'Editar',
        tipe: 2,
        catid: 8,
        req: item
      }
    })
  }

  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Actividad',
        button: 'Crear',
        tipe: 1,
        catid: 8,
        req: {id:null}
      }
    })
  }

}
