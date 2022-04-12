import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  templateUrl: './unidadmedida.component.html',
  styles: [
  ]
})
export class UnidadmedidaComponent implements OnInit {

  unidad: Catalogo[] = [];
  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.configuracion.disparadorActualizar.subscribe(
      response => {
        this.consumeInit();
    })
    if (localStorage.getItem('unidad') == null) {
      this.consumeInit();
    }else{
      this.unidad = JSON.parse(localStorage.getItem('unidad') )
    }
  }

  consumeInit(){
    this.configuracion.getUnidadMedida().subscribe(
      resp => {
        this.unidad = resp;
        localStorage.removeItem('unidad');
        localStorage.setItem('unidad', JSON.stringify(this.unidad));
      }
    );
  }
  edit(item: Catalogo){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Editar Unidad Medida',
        button: 'Editar',
        tipe: 2,
        catid: 2,
        req: item
      }
    })
  }
  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Unidad Medida',
        button: 'Crear',
        tipe: 1,
        catid: 2,
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
          this.unidadMedida(cat);
          Swal.fire(
            'Desactivada',
            'Se desactivo unidad correctamente',
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
          this.unidadMedida(cat);
          Swal.fire(
            'Activada',
            'Se activo unidad correctamente',
            'success'
          )
        }
      })
      // this.unidadMedida(cat);
    }
    this.ngOnInit();
  }

  actualizar(emitido: string){
    console.log(emitido);
  }

  unidadMedida(cat: any){
    this.configuracion.putUnidadMedida(cat).subscribe(
      resp => {
        this.consumeInit();
      }
    )
  }

}
