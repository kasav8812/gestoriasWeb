import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearService } from '../../services/crear.service';
import { Catalogo } from '../../interfaces/configuracion.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dtos-requerimiento',
  templateUrl: './dtos-requerimiento.component.html',
  styleUrls: ['./style.scss']
})
export class DtosRequerimientoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private creaService: CrearService) { }

  requerimiento: CrearResponse;
  crearForm: FormGroup = this.fb.group({
    tipoPermiso: [, [Validators.required]],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    vigencia: [''],
    fechaRequerimiento: [''],
    fechaVencimeinto: [''],
    area: ['', Validators.required],
    unidad: ['', Validators.required]
  })

  municipio: Catalogo[] = null;
  estado: Catalogo[];
  tipoPermiso: Catalogo[];
  areaSolicitate: Catalogo[];
  unidad: Catalogo[];
  res: any;
  jsonCrear: any;

  ngOnInit(): void {

    this.requerimiento = JSON.parse(localStorage.getItem('requerimiento') );
    console.log("Req",this.requerimiento);
    
    this.creaService.getRequerimientosId(this.requerimiento.id).subscribe(
      response => {
        console.log("response requerimiento",response);
        this.requerimiento=response[0];
        this.creaService.get_catalogos().subscribe(
          response => {
            this.res = response;
            this.estado = this.res.ubicacion;
            this.tipoPermiso = this.res.tipoPermiso;
            this.areaSolicitate = this.res.areaSolitante;
            this.unidad = this.res.unidaMedida;
            console.log("response catalgos",response);
            
            this.getMunicipioIni();
          },
          error => {
          }
        )
      },error=>{

      }
      )
    
    
    
    console.log(this.crearForm.value);
  }
  getMunicipioIni(){
    this.creaService.getUbicacionMunicipio(parseInt(this.requerimiento.ubicacion)).subscribe(
      response => {
        this.municipio = response;
        console.log("response municipio::::",this.municipio);
        this.inicializa();
      },
      error => {
      }
    )
  }

  getMunicipio() {
    this.creaService.getUbicacionMunicipio(this.crearForm.value.estado).subscribe(
      response => {
        this.municipio = response;

      },
      error => {
      }
    )

  }
  onSubmit() {
    console.log("Datos del form",this.crearForm);
    this.jsonCrear = {
      id:this.requerimiento.id,
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
          
        },
        error => {
          Swal.fire(
            'Error',
            'Al actualizar requerimiento',
            'error'
          )
        }
      );
      
    }
  inicializa(){
    console.log(this.tipoPermiso);
    
    
    console.log(this.requerimiento);
    let f=this.requerimiento.fechareq.split("/");
    let fecha1=f[2]+"-"+f[1]+"-"+f[0];
    let f2=this.requerimiento.fechavencimiento.split("/");
    let fecha2=f2[2]+"-"+f2[1]+"-"+f2[0];
    console.log(fecha1);
    console.log(new Date(fecha1));
    let vigencia=this.requerimiento.vigencia.split(" ");
    this.crearForm = this.fb.group({
      tipoPermiso: [this.requerimiento.permiso, [Validators.required]],
      estado: [this.requerimiento.ubicacion, Validators.required],
      municipio: [this.requerimiento.municipio, Validators.required],
      vigencia: [vigencia[0]],
      fechaRequerimiento: [fecha1],
      fechaVencimeinto: [fecha2],
      area: [this.requerimiento.area, Validators.required],
      unidad: [vigencia[1], Validators.required]
    })
    console.log(this.crearForm.value)
  }
}
