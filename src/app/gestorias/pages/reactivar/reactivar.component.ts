import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Catalogo, RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { CrearResponse } from '../interfaces/crear.interface';
import { ConfiguracionService } from '../services/configuracion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearService } from '../services/crear.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../dialogs/alert.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reactivar',
  templateUrl: './reactivar.component.html',
  styles: [`

  `
  ]
})
export class ReactivarComponent implements OnInit {
  folio: CrearResponse;
  municipio: Catalogo[] = null;
  estado: Catalogo[];
  tipoPermiso: Catalogo[];
  areaSolicitate: Catalogo[];
  jsonCrear: any;
  submitted=false;

  token: any;
  rol: any;
  res: any;
  area: Catalogo[];
  tipoSolicitud: Catalogo[];
  unidad: Catalogo[];
  cobertura: Catalogo[];
  requerimiento: RequerimientoGeneric;
  requerimientoSalida: RequerimientoGeneric;
  req: CrearResponse;
  horario: string[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

  id:any = JSON.parse(localStorage.getItem('requerimiento'));
  jsonCreate: any;
  permisoEditar:Boolean=true;

  actividadesForm: FormGroup= this.fb.group({
    idRequerimiento: [this.id.id, Validators.required],
    actividad: ['', Validators.required],
    descripcion: ['', Validators.required]
  })

  requerimientoForm: FormGroup = this.fb.group({
    idRequerimiento: [this.id.id, Validators.required],
    folio: ['', Validators.required],
    importe: ['', Validators.required],
    paydate: ['', Validators.required],
    registroContable: ['', Validators.required],
    nombreContacto: ['', Validators.required],
    proveedor: ['', Validators.required],
    sistema: ['', Validators.required],
    tipoSolicitud: ['', Validators.required],
    folioEgreso: ['', Validators.required],
    area: ['', Validators.required],
    cc: ['', Validators.required],
    nombreCc: ['', Validators.required],
    postFin: ['', Validators.required],
    incluidoPermiso: ['', Validators.required],
    horario: ['', Validators.required],
    perNeg: ['', Validators.required],
    catidad: ['', Validators.required],
    vigencia: ['', Validators.required],
    medida: ['', Validators.required],
    formaPago: ['', Validators.required],
    cobertura: ['', Validators.required],
    actividad: ['', Validators.required],
    descripcion: ['', Validators.required],
  })

  tipoAccion:any = localStorage.getItem('tipo');
  constructor(
    private configuracion: ConfiguracionService,
    private router: Router,
    private fb: FormBuilder,
    private creaService: CrearService,
    public dialog: MatDialog
  )
    {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }

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

    if(this.rol === "ROLE_CONFIGURACION"){
      this.router.navigateByUrl('/gestorias/configuracion');
    }
    if(this.rol==="ROLE_OPERACIONES"){
      this.permisoEditar=false;
    }
    this.configuracion.getAreaSolicitante().subscribe(
      response => {
        this.area = response;
      },
      error => {

      }
    );
    this.configuracion.getTipoSolicitud().subscribe(
      response => {
        this.tipoSolicitud = response
      }
    );
    this.configuracion.getTipoCobertura().subscribe(
      response => {
        this.cobertura = response;
        console.log(this.cobertura)
      }
    )
    this.creaService.get_catalogos().subscribe(
      response => {
        this.res = response;
        this.unidad = this.res.unidaMedida;
        console.log(this.unidad)

      },
      error => {
      }
    )
    console.log("Este es el id.",this.id.id);
    this.creaService.postRequerimientoCompletoLista(this.id.id).subscribe(
      response => {
        this.requerimiento=response[0];
        console.log("response",response);
        this.requerimientoForm = this.fb.group({
        idRequerimiento: [this.id.id, Validators.required],
        folio: [this.requerimiento.folio, Validators.required],
        importe: [this.requerimiento.importe, Validators.required],
        paydate: [this.requerimiento.paydate, Validators.required],
        registroContable: [this.requerimiento.registroContable, Validators.required],
        nombreContacto: [this.requerimiento.nombreContacto, Validators.required],
        proveedor: [this.requerimiento.proveedor, Validators.required],
        sistema: [this.requerimiento.sistema, Validators.required],
        tipoSolicitud: [this.requerimiento.tipoSolicitud, Validators.required],
        folioEgreso: [this.requerimiento.folioEgreso, Validators.required],
        area: [this.requerimiento.area, Validators.required],
        cc: [this.requerimiento.cc, Validators.required],
        nombreCc: [this.requerimiento.nombreCc, Validators.required],
        postFin: [this.requerimiento.postFin, Validators.required],
        incluidoPermiso: [this.requerimiento.incluidoPermiso, Validators.required],
        horario: [this.requerimiento.horario, Validators.required],
        perNeg: [this.requerimiento.perNeg, Validators.required],
        catidad: [this.requerimiento.catidad, Validators.required],
        vigencia: [this.requerimiento.vigencia, Validators.required],
        medida: [this.requerimiento.medida, Validators.required],
        formaPago: [this.requerimiento.formaPago, Validators.required],
        cobertura: [this.requerimiento.cobertura, Validators.required],
        actividad: [this.requerimiento.actividad, Validators.required],
        descripcion: [this.requerimiento.descripcion, Validators.required],
      })
        this.actividadesForm= this.fb.group({
          idRequerimiento: [this.id.id, Validators.required],
          actividad: [this.requerimientoForm.value.actividad, Validators.required],
          descripcion: [this.requerimientoForm.value.descripcion, Validators.required]
        })
        console.log("FormularioRequerimiento-init",this.requerimientoForm);
      },error => {
        console.log(error);
      }
    )
  }


  reactivar(){
    let folioAnterior=this.actividadesForm.value.idRequerimiento;
    this.requerimientoForm.value.actividad=this.actividadesForm.value.actividad;
    this.requerimientoForm.value.descripcion=this.actividadesForm.value.descripcion;
 

    console.log("FormularioRequerimiento 2",this.requerimientoForm);
    
    this.creaService.requerimientoReact(folioAnterior).subscribe(
      responseP=>{
        this.requerimientoForm.value.idRequerimiento=responseP.id;
        this.creaService.postRequerimiento(this.requerimientoForm.value).subscribe(
          response => {
            this.requerimientoSalida=response[0];
            console.log("requerimientoSalida reactivar",this.requerimientoSalida);
            let token=JSON.parse(sessionStorage.getItem('token'));
            let tk = JSON.parse(atob(token.split('.')[1]));
            let id = tk.sub;
            let param={"folioVencido":folioAnterior
              ,"folioNuevo":responseP.id
              ,"fecha":new Date()
              ,"user":id
              ,"vencida":1};
              console.log("Realiza el alta de la relacion",param);
               this.creaService.postRequerimientoRelacion(param).subscribe(
                resp => {
                  console.log("Este es el res...",resp);
                }
              );
          },error => {
            console.log(error);
          }
        )
      }
    )

  }

  get f() { return this.crearForm.controls; }
  onSubmit() {
    console.log("Entra a submitted",this.f);
    console.log("his.crearForm.invalid=",this.crearForm.invalid);
    this.submitted=true;
        // stop here if form is invalid
        if (this.crearForm.invalid) {
            return;
        }else{
          console.log("Campos completos");
          this.submitted=false;
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
  /*guardar(){
    console.log("FormularioRequerimiento",this.requerimientoForm);
    console.log("FormularioRequerimiento",this.actividadesForm);
    this.requerimientoForm.value.actividad=this.actividadesForm.value.actividad;
    this.requerimientoForm.value.descripcion=this.actividadesForm.value.descripcion;
    // this.jsonCreate = {

    // }

    console.log("FormularioRequerimiento 2",this.requerimientoForm);
    this.creaService.postRequerimiento(this.requerimientoForm.value).subscribe(
      response => {
        console.log(response)
      },error => {
        console.log(error);
      }
    )

  }*/
  guardar() {
    console.log("Datos del form",this.crearForm);
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
