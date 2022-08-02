import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import { CrearService } from '../../services/crear.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styles: [ '../../style.scss']
})
export class CoberturaComponent implements OnInit {

  area: Catalogo[];
  regiones : Catalogo[];
  estados: Catalogo[];
  municipio: Catalogo[];
  mRegionSelected : string;

  constructor(private configuracion: ConfiguracionService,
    public dialog: MatDialog,private creaService: CrearService) { }

  ngOnInit(): void {

    this.creaService.getRegiones().subscribe(
      response => {
        this.regiones = response;
        console.log(this.regiones);
      },
      error => {
      }
    )


  }

  enabledCat(item){

  }

  edit(item){

  }

  getEstadosByRegion(id){
    console.log(id);
    this.mRegionSelected = id;
    this.creaService.getEstadosByRegion(id).subscribe(
      response => {
        this.municipio = response
      },
      error => {
      }
    )
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

  showEstates(i){
    
  }

  callListStates(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 14,
        title: 'Estados',
        button: 'Crear',
        tipe: 1,
        catid: 7,
        req: {id:this.mRegionSelected}
      }
    })
  }

  deleteEstado(item){
    console.log("Deletes");
    console.log(item);
    this.confirmarDelete(item);
  }

  confirmarDelete(item){
    item.tpgregion = this.mRegionSelected;

    console.log(item);
    Swal.fire({
      title: 'Esta seguro de eliminar el estado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7A4CF6',
      cancelButtonColor: '#8296BA',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.creaService.deleteEstado(item).subscribe(
          response => {
            console.log("Success update List")
            Swal.fire(
              'Estado Eliminado',
              '',
              'success'
            )
          
          },
          error => {
            console.log("Error Update List")
            Swal.fire(
              'Error al eliminar estado',
              '',
              'error'
            )
          }
        )
      }
    })
  }

}
