import { Component, OnInit } from '@angular/core';
import { CrearService } from '../services/crear.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearResponse } from '../interfaces/crear.interface';
import { Catalogo } from '../interfaces/configuracion.interface';
import { RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { Observable } from 'rxjs';
import { FileService } from '../services/file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subir',
  templateUrl: './subir.component.html',
  styleUrls: []
})
export class SubirComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private creaService: CrearService,
    private uploadFilesService: FileService,
    private router: Router
    ) { }
  
  file:[];
  selectedFiles: FileList[]=[];
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = [];
  message = '';
  imageName = '';
  arrayFiles=[];
  fileInfos: Observable<any>;
  datos = [];
  requerimientos: RequerimientoGeneric;
  status:any;

  
  //FIN ARCHIVOS
  requerimiento: CrearResponse;
  private fileName:any;
  private fileLength:any; 
  id:any = JSON.parse(localStorage.getItem('requerimiento'));
  
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
  actividadesForm: FormGroup= this.fb.group({
    idRequerimiento: [this.id.id, Validators.required],
    actividad: ['', Validators.required],
    descripcion: ['', Validators.required]
  })
  

  ngOnInit(): void {
    this.requerimiento = JSON.parse(localStorage.getItem('requerimiento') );
    console.log("Req",this.requerimiento);
    var file = document.getElementById('inputFileServer');
    this.status=this.id.estado;
    console.log(this.status);
    
    this.creaService.postRequerimientoCompletoLista(this.id.id).subscribe(
      response => {
        this.requerimientos=response[0];
        console.log("response",response);
        this.requerimientoForm = this.fb.group({
          importe: [this.requerimientos.importe, Validators.required],
      })
      },error => {
        console.log(error);
      }
    )

    //Traer Costo

    
    
  }
  
 /* getFile($event: any): void{
    
   const [ file ] = $event.target.files;
   console.log(file);
   this.fileTmp ={
     fileRaw: file,
     fileName: file.name
   }
  }*/


  //Archivos
  
  selectFiles($event: any) {
    var [ file ] = $event.target.files;
    this.selectedFiles.push($event.target.files[0]); 
    $event.target.files=this.file;
    console.log("event", this.file);    
    //aqui si funciona el 200
    
  }
  selectFiles2($event: any) {
    var [ file ] = $event.target.files;
    this.selectedFiles.push($event.target.files[0]); 
    $event.target.files=this.file;
    console.log("event", this.file);  
  }
  selectFiles3($event: any) {
    var [ file ] = $event.target.files;
    this.selectedFiles.push($event.target.files[0]); 
    $event.target.files=this.file;
    console.log("event", this.file);  
  }
  selectFiles4($event: any) {
    var [ file ] = $event.target.files;
    this.selectedFiles.push($event.target.files[0]); 
    $event.target.files=this.file;
    console.log("selectedFiles", this.selectedFiles);    
  }
  

  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };
    this.uploadFilesService.upload(file,this.id.id).subscribe(
    event => {
    if (event.type === HttpEventType.UploadProgress) {
    this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
    console.log("si entra.....")
    this.fileInfos = this.uploadFilesService.getFiles();
    }
    },
    error => {
    console.log("Error",error.status);
    
    if(error.status==200){
       this.fileInfos = this.uploadFilesService.getFiles();
      this.progressInfo[index].value = 100;
      Swal.fire(
        { icon: 'success',
     title: 'Se ha enviado los documentos correctamente',
     timer: 1500,
     showConfirmButton: false,
     }
       )
    }else{
    this.progressInfo[index].value = 0;
    this.message = 'No se puede subir el archivo- ' + file.name;
    }
    
    });
    }
    
    
    
    uploadFiles() {
    this.message = '';
    console.log("Este es selected",this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
    this.upload(i, this.selectedFiles[i]);
    }
    }
  selectFile(ruta: any){
    this.uploadFilesService.getFile(ruta).subscribe(
      response=>{
        console.log("Response",response);
      },
      error => {
        console.log("Error",error);
      }
      );
  }

}
