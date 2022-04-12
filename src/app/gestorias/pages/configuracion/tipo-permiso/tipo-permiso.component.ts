import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-permiso',
  templateUrl: './tipo-permiso.component.html',
  styles: [
  ]
})
export class TipoPermisoComponent implements OnInit {

  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }
  tipo: Catalogo[];


  ngOnInit(): void {
    this.configuracion.disparadorActualizar.subscribe(
      response => {
        this.consumeInit();
    })
    if (localStorage.getItem('tipo') == null) {
      this.consumeInit();
    }else{
      this.tipo = JSON.parse(localStorage.getItem('tipo') )
    }
  }

  consumeInit(){
    this.configuracion.getTipoPermiso().subscribe(
      resp => {
        this.tipo = resp;
        localStorage.removeItem('tipo');
        localStorage.setItem('tipo', JSON.stringify(this.tipo));
      }
    );
  }

  edit(item: Catalogo){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Editar Tipo Permiso',
        button: 'Editar',
        tipe: 2,
        catid: 4,
        req: item
      }
    })
  }
  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Tipo Permiso',
        button: 'Crear',
        tipe: 1,
        catid: 4,
        req: {id:null}
      }
    })
  }

  enabledCat(item: Catalogo){
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
          this.tipoPermiso(cat);
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
          this.tipoPermiso(cat);
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

  tipoPermiso(cat: any){
    this.configuracion.putTipoPermiso(cat).subscribe(
      resp => {
        this.consumeInit();
      }
    )
  }
}
