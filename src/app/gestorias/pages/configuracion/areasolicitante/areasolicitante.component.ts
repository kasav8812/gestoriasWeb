import { Component, OnInit } from '@angular/core';

import { Catalogo, CatGeneric } from '../../interfaces/configuracion.interface';
import { ConfiguracionService } from '../../services/configuracion.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-areasolicitante',
  templateUrl: './areasolicitante.component.html',
  styles: [
  ]
})
export class AreasolicitanteComponent implements OnInit {


  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog) { }
  area: Catalogo[];


  ngOnInit(): void {
    this.configuracion.disparadorActualizar.subscribe(
      response => {
        this.consumeInit();
    })
    if (localStorage.getItem('area') == null) {
      this.consumeInit();
    }else{
      this.area = JSON.parse(localStorage.getItem('area') )
    }
  }

  consumeInit(){
    this.configuracion.getAreaSolicitante().subscribe(
      resp => {
        this.area = resp;
        localStorage.removeItem('area');
        localStorage.setItem('area', JSON.stringify(this.area));
      }
    );
  }
  edit(item: Catalogo){
    console.log(item);
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Editar Area Solicitante',
        button: 'Editar',
        tipe: 2,
        catid: 3,
        req: item
      }
    })
  }
  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Area Solicitante',
        button: 'Crear',
        tipe: 1,
        catid: 3,
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
          this.areaSolicitante(cat);
          Swal.fire(
            'Desactivada',
            'Se desactivo correctamente',
            'success'
          )
        }
      });
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
          this.areaSolicitante(cat);
          Swal.fire(
            'Activada',
            'Se activo correctamente',
            'success'
          )
        }
      });
    }
    this.ngOnInit();
  }

  areaSolicitante(cat: any){
    this.configuracion.putAreaSolicitante(cat).subscribe(
      resp => {
        this.consumeInit();
      }
    )
  }

}
