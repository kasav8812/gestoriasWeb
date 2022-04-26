import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Catalogo, RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { CrearResponse } from '../interfaces/crear.interface';
import { ConfiguracionService } from '../services/configuracion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearService } from '../services/crear.service';

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styles: [`

  `
  ]
})
export class RequerimientoComponent implements OnInit {

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
    private creaService: CrearService
  )
    {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }

  ngOnInit(): void {
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

  guardar(){
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

}
