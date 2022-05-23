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
  horario: string[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

  id:any = JSON.parse(localStorage.getItem('requerimiento'));
  jsonCreate: any;
  permisoEditar:Boolean=false;
  nomArchivo: any="Ejemplo.pdf";
  jsonCrear: any;


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
  status:any;
  comentarios: CrearComentario[];
  cat: CatGeneric;
  // ARCHIVOS----

  selectedFiles: FileList[]=[];
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = [];
  message = '';
  imageName = "";
  fileInfos: Observable<any>;
  //FIN ARCHIVOS
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
    console.log("datos token",JSON.parse(atob(this.token.split('.')[1])))
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }

  ngOnInit(): void {
    if(this.rol === "ROLE_CONFIGURACION"){
      this.router.navigateByUrl('/gestorias/configuracion');
    }
    if(this.rol==="ROLE_COMERCIAL"){
      this.permisoEditar=true;
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
    this.configuracion.getTipoActividad().subscribe(
      response => {
        this.actividades = response;
      },
      error => {
      }
    )
    console.log("Este es el id.",this.id.id);
    this.status=this.id.estado;
    this.creaService.postRequerimientoCompletoLista(this.id.id).subscribe(
      response => {
        this.requerimiento=response[0];
        console.log("response",response); 
        this.requerimientoForm = this.fb.group({
        idRequerimiento: [this.id.id, Validators.required],
        folio: [this.requerimiento.folio, Validators.required],
        importe: [this.requerimiento.importe, Validators.required],
        folioSat: [this.requerimiento.folioSat, Validators.required],
        folioCap:[this.requerimiento.folioCap, Validators.required],
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
    this.getComentarios();
    this.fileInfos = this.uploadFilesService.getFiles(this.id.id);
  }

  guardar(){
    console.log("FormularioRequerimiento",this.requerimientoForm);
    console.log("FormularioRequerimiento",this.actividadesForm);
    this.requerimientoForm.value.actividad=this.actividadesForm.value.actividad;
    this.requerimientoForm.value.descripcion=this.actividadesForm.value.descripcion;
    
    console.log("Datos del form",this.requerimientoForm);
    this.jsonCrear = {
      tipoRequerimineto: this.requerimientoForm.value.tipoPermiso,
      ubicacionEstado: this.requerimientoForm.value.estado,
      municipio: this.requerimientoForm.value.municipio,
      vigencia: this.requerimientoForm.value.vigencia,
      umedida: this.requerimientoForm.value.unidad,
      area: this.requerimientoForm.value.area,
      fechaRequerimiento: this.requerimientoForm.value.fechaRequerimiento,
      fechaVencimiento: this.requerimientoForm.value.fechaVencimeinto
    }

    this.creaService.updateRequerimiento(this.requerimientoForm.value).subscribe(
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
            title: "Cancelar requerimiento",
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
                title: "Cancelar requerimiento",
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
    this.selectedFiles = event.target.files;
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
}
