import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearService } from '../services/crear.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../dialogs/alert.component';
import { ActividadesModel, Catalogo, CentroCModel } from '../interfaces/configuracion.interface';
import { CrearResponse, FechaVigencia } from '../interfaces/crear.interface';
import { ConfiguracionService } from '../services/configuracion.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

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
  token: any;
  datosUser: any;
  actividades: Catalogo[];
  rangoHorario : string[] = ["9:00-14:00", "14:00-16:00", "16:00-19:00"]; 
  mComboPermiso : string[] = ["PERMISO", "NEGOCIACIóN"];

  tipoSolicitudAddon: string;
  areaAddon: string;
  vigenciaAddon: string;
  medidaAddon: string;

  mIsComplete: Boolean = false;
  mUnidad : string;
  mCantidad : number;
  mNewDate : Date;
  mActividad : string = "";

  mCC:string;
  mNombreCC: string;
  mAct : string;
  mDescrip : string;
  mPerNeg : string;
  mHorario : string;

  mHasFechas : Boolean = false;

  mResponseFechaVigencia : FechaVigencia;
  mFechasVigencia : FechaVigencia[];

  mArrayActividades: Catalogo[] = [];
  isChecked : Boolean = false;

  mCatCC : CentroCModel[] = [];



  id: any = JSON.parse(localStorage.getItem('requerimiento'));

  crearForm: FormGroup = this.fb.group({
    tipoPermiso: ['', [Validators.required]],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    vigencia: [''],
    fechaRequerimiento: [''],
    fechaVencimeinto: [''],
    area: ['', Validators.required],
    unidad: ['', Validators.required],
    idUser: [''],
    actividad: ['', Validators.required],
    descrip: ['', Validators.required],
    nombreCc: ['', Validators.required],
    cc: ['', Validators.required],
    perNeg:['',Validators.required],
    horario:['', Validators.required]
  })

  fechaVigenciaForm : FormGroup = this.fb.group({
    idReq:['', [Validators.required]],
    vigencia: ['', [Validators.required]],
    unidad:['', [Validators.required]],
    fechaRequerimiento:['', [Validators.required]],
    fechaVencimeinto: ['', [Validators.required]]
  })

  constructor(
    private configuracion: ConfiguracionService,
    private fb: FormBuilder,
    private creaService: CrearService,
    public dialog: MatDialog
  ) {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    this.datosUser = JSON.parse(atob(this.token.split('.')[1]));
  }

  ngOnInit(): void {
    console.log("Mi USUARIO wiiiiiiiiiiii");
    console.log(this.datosUser.sub);
    this.creaService.get_catalogos().subscribe(
      response => {
        this.res = response;
        this.estado = this.res.ubicacion;
        this.tipoPermiso = this.res.tipoPermiso;
        this.areaSolicitate = this.res.areaSolitante;
        this.unidad = this.res.unidaMedida;
        console.log(this.unidad);
      },
      error => {
      }
    )

    this.configuracion.getTipoActividad().subscribe(
      response => {
        this.actividades = response;

      },
      error => {
      }
    )   
    
    this.getFechas();

    this.configuracion.disparadorActualizar.subscribe(
      response => {
        this.getActividades();
        this.getFechas();
    })
    

    this.creaService.getAllCCEnabled().subscribe(
      response => {
        this.mCatCC = response;
      },
      error => {
      }
    ) 

  }

  getActividades(){
    this.mActividad = "";
    this.configuracion.getTipoActividad().subscribe(
      response => {
        this.actividades = response;
      },
      error => {
      }
    )
  }

  crearforms(){
   
  }

  get f() { return this.crearForm.controls,this.fechaVigenciaForm.controls}

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

  public onDate(event) {
    console.log(event.target.value);
    this.calculateDate(this.mUnidad,this.mCantidad, event.target.value);
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

  getUnidad(event) {
    console.log(event.target.value);
    this.mUnidad = event.target.value;
  }

  getCantidad(event) {
    console.log(event.target.value);
    this.mCantidad = event.target.value;
  }

 getActividad(event) : string{
  for (var i = 0; i < this.actividades.length; i++){
    if(this.actividades[i].id == event){
      this.mActividad = this.actividades[i].comentario;
    }else{
    
    }
  }
  return this.mActividad;
 }


  calculateDate(mUnidad: string, mCantidad: number, mFirstDateSelected: Date) {
    this.mNewDate = new Date();
    this.mNewDate = mFirstDateSelected;
    switch (mUnidad) {
      case "1":
        this.mNewDate.setDate( this.mNewDate.getMilliseconds() + 1 );
        break

      case "2":
        this.mNewDate.setDate( this.mNewDate.getDay() + 7 );
        break

      case "3":
        this.mNewDate.setDate( this.mNewDate.getMonth() + mCantidad );
        break

      case "4":
        this.mNewDate.setDate( this.mNewDate.getFullYear() + mCantidad );
        break
    }
  }

  validateCantidadDay(mCantidad:number, mMonth:string):number{
   

    return 1;
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
    this.medidaAddon = this.crearForm.value.unidad;

    this.mCC = this.crearForm.value.cc;
    this.mNombreCC = this.crearForm.value.nombreCc;
    this.mAct = this.crearForm.value.actividad;
    this.mDescrip = this.mActividad;
    this.mPerNeg = this.crearForm.value.perNeg;
    this.mHorario = this.crearForm.value.horario;
  

    this.jsonCrear = {
      tipoRequerimineto: this.crearForm.value.tipoPermiso,
      ubicacionEstado: this.crearForm.value.estado,
      municipio: this.crearForm.value.municipio,
      vigencia: this.crearForm.value.vigencia,
      umedida: this.crearForm.value.unidad,
      area: this.crearForm.value.area,
      fechaRequerimiento: this.crearForm.value.fechaRequerimiento,
      fechaVencimiento: this.crearForm.value.fechaVencimeinto,
      idUser: this.datosUser.sub
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
    let f = mResponse.fechavencimiento.split("/");
    let fecha1 = f[2] + "/" + f[1] + "/" + f[0];

    this.jsonCrear = {
      idRequerimiento: mResponse.id,
      folio: mResponse.id,
      importe: 0,
      paydate: fecha1,
      registroContable: "",
      nombreContacto: "",
      proveedor: "",
      sistema: 1,
      tipoSolicitud: 403,
      folioEgreso: "",
      area: this.areaAddon,
      cc: this.mCC,
      nombreCc: this.mNombreCC,
      postFin: "",
      incluidoPermiso: "",
      horario: this.mHorario,
      perNeg: this.mPerNeg,
      catidad: 0,
      vigencia: this.vigenciaAddon,
      medida: this.medidaAddon,
      formaPago: "",
      cobertura: "1",
      actividad:"41",
      descripcion: this.mDescrip,
      foliosap: "",
      folioseg: "",
      idUserAdmon: "",
      idUserAut: ""
    }

    console.log("uiipp");
    console.log(this.jsonCrear);
    console.log("uuuipp");


    this.creaService.postRequerimiento(this.jsonCrear).subscribe(
      response => {
        console.log("Success All Reqe")
          this.creaService.recibirRequerimiento(mResponse.id).subscribe(
            response => {
              console.log("Change Status")
              console.log(response)
              this.saveListActividades(mResponse.id);

              
            }, error => {
              this.saveListActividades(mResponse.id);
              console.log("Change Status Error")
              console.log(error);
            }
          )
      }, error => {
        console.log("Response Error")
      }
    )
  }

  create(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 3,
        title: 'Crea Actividad',
        button: 'Crear',
        tipe: 1,
        catid: 8,
        req: {id:null}
      }
    })
  }

  loadFechaVigencia(){
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 11,
        title: "",
        req: {id:"tmpReq"}
      }
    })
  }


  updateFecha(idReq : number){
    this.creaService.updateFechaVigencia(idReq).subscribe(
      response => {
        this.mResponseFechaVigencia = response;
        if(this.mResponseFechaVigencia.idReq == ""){
          console.log("Success Update fechas")
        }
      }, error => {
        console.log("Response Error")
      }
    )
  }


  getFechas(){
    this.creaService.getFechasVigencia("tmpReq").subscribe(
      response => {
        this.mFechasVigencia = response;
        console.log(this.mFechasVigencia);
        if(this.mFechasVigencia != null){
          this.mHasFechas = true;
          console.log("Success Update Requerimiento")
        }
      }, error => {
        console.log("Response Error")
      }
    )
  }


  getDescription(mUnidad):string{
    var mDescrip : string = "";
    for(var i=0;i<this.unidad.length;i++){
      if(this.unidad[i].id==mUnidad){
        mDescrip = this.unidad[i].descripcion;
      }
    }

    return mDescrip;
  }

  deleteFechaVigencia(idReq:string){

    this.creaService.deleteFechaVigencia(idReq).subscribe(
      response => {
        console.log("success delete");
        this.ngOnInit();
      }, error => {
        console.log("fail delete");
      }
    )
    console.log(idReq);
  }

  addActividadesCheck(item:Catalogo){
    var mTempActividades : Catalogo [] = [];
    var isNewItem : Boolean = true;
    console.log(item);

    if(this.mArrayActividades.length <= 0){
      this.mArrayActividades.push(item);
    }else{
      for(var i=0;i<this.mArrayActividades.length;i++){
        if(this.mArrayActividades[i].id == item.id){
          isNewItem = false;
        }else{
          mTempActividades.push(this.mArrayActividades[i])
        }
      }
      if(isNewItem){
        mTempActividades.push(item);
      }
      this.mArrayActividades = mTempActividades;
    }

    console.log(this.mArrayActividades);
  }
  
  saveListActividades(idReq){
    var mListActividades : any[] = []

    for(var i=0; i<this.mArrayActividades.length; i++){
        this.jsonCrear ={
          tpgcreqid:idReq,
          tpgcacid:this.mArrayActividades[i].id
        }

        mListActividades.push(this.jsonCrear);
    }

    console.log("Save Actividades");
    console.log(mListActividades);
    this.creaService.setActividades(mListActividades).subscribe(
      response=>{
       console.log("Succces Save Actviidades")
       this.updateFecha(idReq);
      },error =>{
        console.log("Error Save Actviidades");
        this.updateFecha(idReq);
      }
    )
  }


}





