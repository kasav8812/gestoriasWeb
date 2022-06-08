import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Catalogo, RequerimientoGeneric, CatGeneric } from '../interfaces/configuracion.interface';
import { CrearResponse, CrearComentario } from '../interfaces/crear.interface';
import { ConfiguracionService } from '../services/configuracion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearService } from '../services/crear.service';
import { AlertComponent } from '../../dialogs/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { plantillaCorreo } from '../services/constantes.service';
import Swal from 'sweetalert2';
import { FileService } from '../services/file.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {MailService} from '../services/mail.service'
import { min } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HostListener } from "@angular/core";



@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['../../style.scss']
})
export class RequerimientoComponent implements OnInit {
  
  private plantilla: string = plantillaCorreo.cambioStatus;
  token: any;
  rol: any;
  res: any;
  area: Catalogo[];
  tipoSolicitud: Catalogo[];
  unidad: Catalogo[];
  cobertura: Catalogo[];
  actividades: Catalogo[];
  requerimiento: RequerimientoGeneric;
  requerimientoSalida: RequerimientoGeneric;
  req: CrearResponse;
  tmpReq: CrearResponse;
  submitted=false;
  mCheckSap : Boolean = false;
  mCheckSeguimiento : Boolean = false;

  

  horario: string[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

  id:any = JSON.parse(localStorage.getItem('requerimiento'));
  
  jsonCreate: any;
  permisoEditar:Boolean=false;
  permisoEditarInfoBasica:Boolean= true;

  nomArchivo: any="Ejemplo.pdf";
  jsonCrear: any;
  pipe = new DatePipe('en-US');

  municipio: Catalogo[] = null;
  estado: Catalogo[];
  tipoPermiso: Catalogo[];
  areaSolicitate: Catalogo[];
  datosUser: any;
  comentario:string;

  comentariosForm: FormGroup= this.fb.group({
    idUser: ['', Validators.required],
    usuario: ['', Validators.required],
    comentario: ['', Validators.required],
    idRequerimiento: ['', Validators.required],
    idComentarioReply: ['', Validators.required]
  })

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
    foliosap : ['',Validators.required],
    folioseg : ['',Validators.required]
  })

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

  constructor(
    private configuracion: ConfiguracionService,
    private router: Router,
    private fb: FormBuilder,
    private creaService: CrearService,
    public dialog: MatDialog,
    private uploadFilesService: FileService,
    private serviceMail: MailService
  )
    {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    this.datosUser=JSON.parse(atob(this.token.split('.')[1]));

    console.log("datos token",JSON.parse(atob(this.token.split('.')[1])))
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }

  tipoAccion:any = localStorage.getItem('tipo');
  status:any;
  comentarios: CrearComentario[];
  cat: CatGeneric;
  // ARCHIVOS----

  selectedFiles: FileList[]=[];
  tmpFiles: FileList[]=[];
  file : File;


  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = [];
  message = '';
  imageName = "";
  fileInfos: Observable<any>;
  //FIN ARCHIVOS
 

  ngOnInit(): void {
    if(this.rol === "ROLE_CONFIGURACION"){
      this.router.navigateByUrl('/gestorias/configuracion');
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

    this.configuracion.getTipoActividad().subscribe(
      response => {
        this.actividades = response;
      },
      error => {
      }
    )

    this.tmpReq = JSON.parse(localStorage.getItem('requerimiento') );
    console.log("alskdnalksndlkansdlkandslkanslkdnaskldanklsdnalksndkla")
    console.log(this.tmpReq.id);

    this.creaService.getRequerimientosId(this.tmpReq.id).subscribe(
      response => {
        this.tmpReq=response[0];
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
            console.log("Error")
            console.log(error);
          }
        )
      },error=>{
        console.log("Response Error")
        console.log(error);
      }
      )
    

    console.log("Este es el id.",this.id.id);
    this.status=this.id.estado;
    console.log("####################");
    console.log(this.status);
    console.log("####################");
    
    this.creaService.postRequerimientoCompletoLista(this.id.id).subscribe(
      response => {
        this.requerimiento=response[0];
        console.log("response",response); 
        this.requerimientoForm = this.fb.group({
        idRequerimiento: [this.id.id, Validators.required],
        folio: [this.requerimiento.folio, Validators.required],
        importe: [this.requerimiento.importe, Validators.required],
        foliosap: [this.requerimiento.foliosap, Validators.required],
        folioseg:[this.requerimiento.folioseg, Validators.required],
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
    );
    this.getComentarios();
    this.fileInfos = this.uploadFilesService.getFiles(this.id.id);
  

    switch(this.rol) { 
      case "ROLE_COMERCIAL": { 
        if(this.tmpReq.idestado == 2){
          this.permisoEditar = true;
          this.permisoEditarInfoBasica = false;
        }
         break; 
      } 
      case "ROLE_OPERACIONES": { 
        if(this.tmpReq.idestado == 1){
          this.permisoEditar = false;
          this.permisoEditarInfoBasica = true;
        }
         break; 
      } 

      case "ROLE_AUTORIZACION": { 
          this.permisoEditar = false;
          this.permisoEditarInfoBasica = false;
        
        break; 
     } 
      default: { 
         break; 
      } 
   } 

     if(this.id.estado == 5){
      this.permisoEditar = false;
      this.permisoEditarInfoBasica = false;
     }

  }

  getMunicipioIni(){
    this.creaService.getUbicacionMunicipio(parseInt(this.tmpReq.ubicacion)).subscribe(
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
        this.municipio = response
      },
      error => {
      }
    )

  }

  inicializa(){
    console.log(this.tipoPermiso);
    
    console.log(this.tmpReq);
    let f=this.tmpReq.fechareq.split("/");
    let fecha1=f[2]+"-"+f[1]+"-"+f[0];
    let f2=this.tmpReq.fechavencimiento.split("/");
    let fecha2=f2[2]+"-"+f2[1]+"-"+f2[0];
    console.log(fecha1);
    console.log(new Date(fecha1));
    let vigencia=this.tmpReq.vigencia.split(" ");
    this.crearForm = this.fb.group({
      tipoPermiso: [this.tmpReq.permiso, [Validators.required]],
      estado: [this.tmpReq.ubicacion, Validators.required],
      municipio: [this.tmpReq.municipio, Validators.required],
      vigencia: [vigencia[0]],
      fechaRequerimiento: [fecha1],
      fechaVencimeinto: [fecha2],
      area: [this.tmpReq.area, Validators.required],
      unidad: [vigencia[1], Validators.required]
    });
    console.log(this.crearForm.value);
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

  guardar(){
    switch(this.rol){
      case "ROLE_COMERCIAL": { 
       this.updateReqAddon()
         break; 
      } 
      case "ROLE_OPERACIONES": { 
        this.UpdateInfoBasicReq();
         break; 
      } 

      case "ROLE_AUTORIZACION": { 
        this.updateReqAddon();
        break; 
     } 
      default: { 
         break; 
      } 
    }
   
  }

  UpdateInfoBasicReq(){
    console.log("Anexo");

    let f=this.crearForm.value.fechaRequerimiento.split("-");
    let fecha1=f[0]+"/"+f[1]+"/"+f[2];
    let f2=this.crearForm.value.fechaVencimeinto.split("-");
    let fecha2=f2[0]+"/"+f2[1]+"/"+f2[2];

    this.jsonCrear = {
      id : this.tmpReq.id,
      tipoRequerimineto: this.tmpReq.permiso,
      ubicacionEstado: this.crearForm.value.estado,
      municipio: this.crearForm.value.municipio,
      vigencia: this.crearForm.value.vigencia,
      umedida: this.crearForm.value.unidad,
      area: this.crearForm.value.area,
      fechaRequerimiento: fecha1,
      fechaVencimiento: fecha2
    };

    console.log("uiipp");
    console.log(this.jsonCrear);
    console.log("uuuipp");

    this.creaService.updateRequerimiento(this.jsonCrear).subscribe(
      response => {
        Swal.fire(
          'Datos Guardados',
          '',
          'success'
        )
        console.log(response)
      },error => {
        Swal.fire(
          'Ocurrio un error al guardar los datos',
          '',
          'error'
        )
        console.log(error);
      }
    )
  }

  updateReqAddon(){
    console.log("update");
    let f=this.requerimientoForm.value.paydate.split("-");
    let fecha1=f[0]+"/"+f[1]+"/"+f[2];
    this.jsonCrear={
      idRequerimiento: this.tmpReq.id,
      folio: this.tmpReq.id,
      importe: this.requerimientoForm.value.importe,
      paydate: fecha1,
      registroContable: this.requerimientoForm.value.registroContable,
      nombreContacto: this.requerimientoForm.value.nombreContacto,
      proveedor: this.requerimientoForm.value.proveedor,
      sistema: this.requerimientoForm.value.sistema,
      tipoSolicitud: "403",
      folioEgreso: this.requerimientoForm.value.folioEgreso,
      area: this.requerimientoForm.value.area,
      cc: this.requerimientoForm.value.cc,
      nombreCc: this.requerimientoForm.value.nombreCc,
      postFin: this.requerimientoForm.value.postFin,
      incluidoPermiso: this.requerimientoForm.value.incluidoPermiso,
      horario: this.requerimientoForm.value.horario,
      perNeg: this.requerimientoForm.value.perNeg,
      catidad: this.requerimientoForm.value.catidad,
      vigencia: this.requerimientoForm.value.vigencia,
      medida: this.requerimientoForm.value.medida,
      formaPago: this.requerimientoForm.value.formaPago,
      cobertura: "1",
      actividad: "41",
      descripcion: "",
      foliosap:"10001",
      folioseg:"20002"
    }

    console.log("Carlitos")
    console.log(this.jsonCrear);

    this.creaService.updateRequerimientoAddon(this.jsonCrear).subscribe(
      response => {
        Swal.fire(
          'Datos Guardados',
          '',
          'success'
        )
        console.log(response)
      },error => {
        Swal.fire(
          'Ocurrio un error al guardar los datos',
          '',
          'error'
        )
        console.log(error);
      }
    )
  }

  cambiarStatus(){
    console.log("FormularioRequerimiento",this.requerimientoForm);
    console.log("FormularioRequerimiento",this.actividadesForm);
    this.requerimientoForm.value.actividad=this.actividadesForm.value.actividad;
    this.requerimientoForm.value.descripcion=this.actividadesForm.value.descripcion;
    // this.jsonCreate = {

    // }

    console.log("FormularioRequerimiento 2",this.requerimientoForm);
    switch(this.rol) { 
      case "ROLE_COMERCIAL": { 
        this.creaService.porAutorizarRequerimiento(this.requerimientoForm.value.idRequerimiento).subscribe(
          response => {
            console.log(response)
          },error => {
            this.envioCorrecto();
            console.log(error);
          }
        )
             break; 
      } 
      case "ROLE_OPERACIONES": { 
        this.creaService.recibirRequerimiento(this.requerimientoForm.value.idRequerimiento).subscribe(
          response => {
            console.log(response)
          },error => {
            this.envioCorrecto();
            console.log(error);
          }
        )
             break; 
      } 

      case "ROLE_AUTORIZACION": { 
        this.creaService.autorizaRequerimiento(this.requerimientoForm.value.idRequerimiento).subscribe(
          response => {
            console.log(response)
          },error => {
            console.log(error);
            this.envioCorrecto();
          }
        )
            break; 
     } 
      default: { 
         break; 
      } 
   } 
  }

  envioCorrecto(){
    Swal.fire({
      title: 'Requerimiento Enviado',
      icon: 'success',
      confirmButtonColor: '#7A4CF6',
      confirmButtonText: 'Listo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/gestorias/requerimientos');
      }
    })
  }

  confirmarEnvio(){
    Swal.fire({
      title: 'Desea enviar solicitud?',
      text: "Estas seguro que deseas enviar el requerimiento a Aprobación?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7A4CF6',
      cancelButtonColor: '#8296BA',
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarStatus()
      }
    })
  }

  confirmarAutorizacion(){
    Swal.fire({
      title: 'Deseas autorizar solicitud?',
      text: "Estas seguro que deseas enviar el requerimiento a Autorizar?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7A4CF6',
      cancelButtonColor: '#8296BA',
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarStatus()
      }
    })
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
  
  autoriza(){
    console.log(this.id);
    this.creaService.autorizaRequerimiento(this.id.id).subscribe(
       responseP=>{
        console.log(responseP);
        const dialogRef = this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            tipo: 5,
            title: "Autorizar requerimiento",
            array: [this.id]
          }
        })
      },error => {
          console.log(error);
          console.log(error.error.text);
          this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.id.id)
          if(error.error.text==="Exito"){
            const dialogRef = this.dialog.open(AlertComponent, {
              disableClose: true,
              data: {
                tipo: 5,
                title: "Autorizar requerimiento",
                array: [this.id]
              }
            })
          }
      }
    )
  }

  rechaza(){
    this.creaService.cancelaRequerimiento(this.id.id).subscribe(
       responseP=>{
        console.log(responseP);
        const dialogRef = this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            tipo: 5,            
            title: "Autorizar Requerimiento",
            array: [this.id]
          }
        })
      },error => {
          console.log(error);
          if(error.error.text==="Exito"){
            const dialogRef = this.dialog.open(AlertComponent, {
              disableClose: true,
              data: {
                tipo: 5,            
                title: "Autorizar Requerimiento",
                array: [this.id]
              }
            })
          }
      }
    )
  }

  sendMail(tipo: any,user: any,accion: any, idRequerimiento: any){
    this.plantilla=this.plantilla.replace("#Tipo",tipo);
    this.plantilla=this.plantilla.replace("#User",user);
    this.plantilla=this.plantilla.replace("#Accion",accion);
    this.plantilla=this.plantilla.replace("#IdRequerimiento",idRequerimiento);
    this.plantilla=this.plantilla.replace("#IdRequerimiento",idRequerimiento);
    this.plantilla=this.plantilla.replace("#IdRequerimiento",idRequerimiento);
    let param={
        "to": "jgonzalezg@mcllent.com",
        "cc": "",
        "bcc": "",
        "reply_to": "no-reply@totalplay.com.mx",
        "subject": "TEST",
        "body": this.plantilla,
        "from_Address": "",
        "from_Personal": ""
    }
    console.log("Este es la plantilla",this.plantilla);
    this.serviceMail.getToken().subscribe(
       response=>{
        console.log("Response del token___",response);        
          this.serviceMail.sendMail(param,response.access_token).subscribe(
             responseP=>{
              console.log("Response del mail___",responseP);
              
            },error => {
                console.log(error);
            }
          )
      },error => {
          console.log(error);
      }
    )
  }

  getComentarios(){
    this.creaService.getComentariosId(this.id.id).subscribe(
      response => {
        console.log("Response comentarios",response);
        this.comentarios=response;
    },error => {
        console.log(error);
    }
    )
  }

  onFileSelected(fileInput:any) {
    
  }
  
  verDocumento(){
    
  }
  addActividad(){
    let desc=(<HTMLInputElement>document.getElementById("descripcion")).value;
    let com=(<HTMLInputElement>document.getElementById("actividad")).value;
    console.log(desc);
    console.log(com);
    this.cat = {
      activo: 1,
      id:0,
      descripcion: desc,
      comentario: com,
    }
    console.log(this.cat)
    this.configuracion.setTipoActividad(this.cat).subscribe(
      resp =>{
        this.configuracion.getTipoActividad().subscribe(
          response => {
            console.log("actividades..",response);
            this.actividades = response;
            Swal.fire(
              'Exito',
              'Exito al guardar la actividad',
              'success'
            )
            this.actividadesForm.reset();
          },
          error => {

          }
        );
      },error =>{
        Swal.fire(
          'Error',
          'Al guardar la actividad',
          'error'
        )
      }
    );
  }
  //Archivos
  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";   
    for (var i = 0; i < event.target.files.length; i++){
      this.selectedFiles.push(event.target.files[i])      
    }
  }
  
  deleteFile(event){
    for (var i = 0; i < this.selectedFiles.length; i++){
      if(event != i){
        this.tmpFiles.push(this.selectedFiles[i]);
      }     
    }
    this.selectedFiles = this.tmpFiles;
    this.tmpFiles = []
  } 

  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadFilesService.upload(file,this.id.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log("si entra.....")
          this.fileInfos = this.uploadFilesService.getFiles(this.id.id);
        }
      },
      error => {
        console.log("Error",error.status);
        
        if(error.status==200){ 
          this.fileInfos = this.uploadFilesService.getFiles(this.id.id);
          this.progressInfo[index].value = 100;
          Swal.fire(
            {
              icon: 'success',
              title: 'Se ha enviado los documentos correctamente',
              timer: 1500,
              showConfirmButton: false,
            }
          )
        }else{
          this.progressInfo[index].value = 0;
          this.message = 'No se puede subir el archivo- ' + file.name;
          Swal.fire(
            {
              icon: 'error',
              title: 'No se puede subir el archivo ',
              timer: 1500,
              showConfirmButton: false,
            }
          )
        }
        
      });
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  selectFile(ruta: any,nombreA: any){
    let tipo=nombreA.split(".")[1];
    console.log("Tipo________",tipo);
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 7,
        tipoFile:tipo,
        file: ruta,
        nombre: nombreA
      }
    })
    /*
    this.uploadFilesService.getFile(ruta).subscribe(
      response=>{
        console.log("Response",response);
        
      },
      error => {
        console.log(error);
        var blob = new Blob([error.error.text], {type: "application/pdf"});
        console.log("Error",blob);

        var file = window.URL.createObjectURL(error.error.text);
        var a = document.createElement("a");
        a.href = file;
        a.download =  "detailPDF";
        document.body.appendChild(a);
        a.click();
    */
        /*var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
        var objectUrl = URL.createObjectURL(error.error.text);
        window.open(objectUrl);*/
        /*const dialogRef = this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            tipo: 7,
            file: error.error.text
          }
        })
      }
      );*/
  }
  //fin archivos

  guardaComentario(){
    console.log(this.comentario);
    this.comentariosForm.value.idUser=this.datosUser.sub;
    this.comentariosForm.value.usuario=this.datosUser.name;
    this.comentariosForm.value.idRequerimiento=this.tmpReq.id
    this.comentariosForm.value.idComentarioReply=0;
    
    console.log("formComentarios",this.comentariosForm.value);
    this.creaService.addComentario(this.comentariosForm.value).subscribe(
      response=>{
        console.log(response);
        this.ngOnInit();
        this.comentariosForm.reset();
      },error =>{
        this.ngOnInit();
        this.comentariosForm.reset();
      }

      )
  }

  CheckSap(){
    if(this.mCheckSap == false){
      this.mCheckSap = true
    }else{
      this.mCheckSap = false
    } 
 }

 CheckSeguimiento(){
    if(this.mCheckSeguimiento == false){
      this.mCheckSeguimiento = true
    }else{
      this.mCheckSeguimiento = false
    }
  }
}
