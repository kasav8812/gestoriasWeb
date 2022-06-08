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
  submitted = false;
  tmpReq: CrearResponse;

  tipoSolicitudAddon: string;
  areaAddon: string;
  vigenciaAddon: string;
  medidaAddon: string;

  mIsComplete: Boolean = false;

  id: any = JSON.parse(localStorage.getItem('requerimiento'));

  crearForm: FormGroup = this.fb.group({
    tipoPermiso: ['', [Validators.required]],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    vigencia: [''],
    fechaRequerimiento: [''],
    fechaVencimeinto: [''],
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

  get f() { return this.crearForm.controls; }

  onSubmit() {
    console.log("Entra a submitted", this.f);
    console.log("his.crearForm.invalid=", this.crearForm.invalid);
    this.submitted = true;
    // stop here if form is invalid
    if (this.crearForm.invalid) {
      if (this.crearForm.controls.tipoPermiso.value != '' || this.crearForm.controls.estado.value != '' || this.crearForm.controls.municipio.value != '' || this.crearForm.controls.vigencia.value
        || this.crearForm.controls.fechaRequerimiento.value || this.crearForm.controls.fechaVencimeinto.value || this.crearForm.controls.area.value || this.crearForm.controls.unidad.value) {
        this.mIsComplete = false;
        this.guardar();
      }
    } else {
      this.mIsComplete = true;
      console.log("Campos completos");
      this.submitted = false;
      this.guardar();
    }
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
    console.log("Datos del form", this.crearForm);
    this.tipoSolicitudAddon = this.crearForm.value.tipoPermiso;
    this.areaAddon = this.crearForm.value.area;
    this.vigenciaAddon = this.crearForm.value.vigencia;
    this.medidaAddon = this.crearForm.value.unidad


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


    console.log("Datos del form");

    console.log(this.jsonCrear);


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
        this.tmpReq = response;
        this.guardSetAddon(this.tmpReq);
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

  guardSetAddon(mResponse: CrearResponse) {
    this.jsonCrear = {
      idRequerimiento: mResponse.id,
      folio: mResponse.id,
      importe: 0,
      paydate: "",
      registroContable: "",
      nombreContacto: "",
      proveedor: "",
      sistema: 1,
      tipoSolicitud: 403,
      folioEgreso: "",
      area: this.areaAddon,
      cc: 0,
      nombreCc: "",
      postFin: "",
      incluidoPermiso: "",
      horario: "",
      perNeg: "",
      catidad: 0,
      vigencia: this.vigenciaAddon,
      medida: this.medidaAddon,
      formaPago: "",
      cobertura: "1",
      actividad: "",
      descripcion: "",
      foliosap: "",
      folioseg: ""
    }

    console.log("uiipp");
    console.log(this.jsonCrear);
    console.log("uuuipp");


    this.creaService.postRequerimiento(this.jsonCrear).subscribe(
      response => {
        console.log("Success")
        if (this.mIsComplete) {
          this.creaService.recibirRequerimiento(mResponse.id).subscribe(
            response => {
              console.log("Change Status")
              console.log(response)
            }, error => {
              console.log(error);
            }
          )
        }
      }, error => {
        console.log("Response Error")
      }
    )
  }


}



