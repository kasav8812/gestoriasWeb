import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-solicitud',
  templateUrl: './tipo-solicitud.component.html',
  styles: [
  ]
})
export class TipoSolicitudComponent implements OnInit {

  solicitud: Catalogo[];

  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.configuracion.disparadorActualizar.subscribe(
      response => {
        this.consumeInit();
    })
    if (localStorage.getItem('solicitud') == null) {
      this.consumeInit();
    }else{
      this.solicitud = JSON.parse(localStorage.getItem('solicitud') )
    }
  }
  consumeInit(){
    this.configuracion.getTipoSolicitud().subscribe(
      resp => {
        this.solicitud = resp;
        localStorage.removeItem('solicitud');
        localStorage.setItem('solicitud', JSON.stringify(this.solicitud));
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
    this.configuracion.putTipoSolicitud(cat).subscribe(
      resp => {
        this.consumeInit();
      }
    )
  }
  edit(item){
    console.log(item);
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Editar Area Solicitante',
        button: 'Editar',
        tipe: 2,
        catid: 6,
        req: item
      }
    })
  }

  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Solicitud',
        button: 'Crear',
        tipe: 1,
        catid: 6,
        req: {id:null}
      }
    })
  }
}
