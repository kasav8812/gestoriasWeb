import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearService } from '../services/crear.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../dialogs/alert.component';
import { Catalogo } from '../interfaces/configuracion.interface';
import { CrearResponse } from '../interfaces/crear.interface';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['../../style.scss']
})
export class CrearComponent implements OnInit {

  folio: CrearResponse;
  municipio: Catalogo[] = null;
  estado: Catalogo[];
  tipoPermiso: Catalogo[];
  areaSolicitate: Catalogo[];
  unidad: Catalogo[];
  res: any;
  jsonCrear: any;

  crearForm: FormGroup = this.fb.group({
    tipoPermiso: ['', Validators.required],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    vigencia: ['', Validators.required],
    fechaRequerimiento: ['', Validators.required],
    fechaVencimeinto: ['', Validators.required],
    area: ['', Validators.required],
    unidad: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private creaService: CrearService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.creaService.get_catalogos().subscribe(
      response => {
        this.res = response;
        this.estado = this.res.ubicacion;
        this.tipoPermiso = this.res.tipoPermiso;
        this.areaSolicitate = this.res.areaSolitante;
        this.unidad = this.res.unidaMedida;

      },
      error => {
      }
    )
  }

  campoNovalido(campo: string) {

  }

  getMunicipio() {
    this.creaService.getUbicacionMunicipio(this.crearForm.value.estado).subscribe(
      response => {
        this.municipio = response
      },
      error => {
      }
    )

  }
  fechaInvalida(campo: string) {
   /* let prueba = this.crearForm.value.fechaRequerimiento;
    let p = prueba.split("-")
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    if (p[2] < hoy) {

      console.log(prueba);
      return this.crearForm.invalid;
    }*/
  }
  guardar() {
    this.jsonCrear = {
      tipoRequerimineto: this.crearForm.value.tipoPermiso,
      ubicacionEstado: this.crearForm.value.estado,
      municipio: this.crearForm.value.municipio,
      vigencia: this.crearForm.value.vigencia,
      umedida: this.crearForm.value.unidad,
      area: this.crearForm.value.area,
      fechaRequerimiento: this.crearForm.value.fechaRequerimiento,
      fechaVencimiento: this.crearForm.value.fechaVencimeinto
      
  }
  
  this.creaService.cres_Requerimiento(this.jsonCrear).subscribe(
        response => {
          const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            data: {
              tipo: 1,
              req: response
            }
          })
          this.crearForm.reset();
        },
        error => {
          Swal.fire(
            'Error',
            'Al crear requerimiento',
            'error'
          )
        }
      );
      
    }
  

}
