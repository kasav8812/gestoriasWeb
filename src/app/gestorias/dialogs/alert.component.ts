import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Catalogo, CatGeneric } from '../pages/interfaces/configuracion.interface';
import { RolesResponse } from '../pages/interfaces/crear.interface';
import { ConfiguracionService } from '../pages/services/configuracion.service';
import { CrearService } from '../pages/services/crear.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent  {
  // @Output() public textoEmitido = new EventEmitter<string>();
  // @Output() reloadComponent: EventEmitter<any> = new EventEmitter();

  constructor(
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AlertComponent>,private creaService: CrearService
  ) { 
    this.token = JSON.parse(sessionStorage.getItem('token'));
    this.datosUser=JSON.parse(atob(this.token.split('.')[1]));
  }

  cat: CatGeneric;
  area: Catalogo[];
  municipio: Catalogo[] = null;
  res: any;
  roles : RolesResponse[];

  comentariosForm: FormGroup= this.formBuilder.group({
    idUser: ['', Validators.required],
    usuario: ['', Validators.required],
    comentario: ['', Validators.required],
    idRequerimiento: ['', Validators.required],
    idComentarioReply: ['', Validators.required]
  })
  token:any;
  datosUser: any;


  ngOnInit(): void {
    this.creaService.get_catalogos().subscribe(
      response => {
        this.res = response;
        this.municipio = this.res.ubicacion;
      },
      error => {
      }
    )

    this.creaService.getAllRoles().subscribe(
      response => {
        this.roles = response;
      },
      error => {
      }
    )
  }

 
  editRequrimineto(requerimiento){
    localStorage.setItem('requerimiento', JSON.stringify(requerimiento));
    localStorage.setItem('tipo', 'Reactivar');
  }
  
  consumeArea(){
    this.configuracion.getAreaSolicitante().subscribe(
      resp => {
        this.area = resp;
        localStorage.removeItem('area');
        localStorage.setItem('area', JSON.stringify(this.area));
      }
    );
  }

  crearForm: FormGroup = this.formBuilder.group({
    nombre: ['',[ Validators.required, Validators.maxLength(2)]],
    descripcion: ['', Validators.required]
  })

  generico(type: number, id: number, catid: number){
    console.log(catid)
    this.cat = {
      activo: 1,
      id: id,
      descripcion: this.crearForm.value.nombre,
      comentario: this.crearForm.value.descripcion,
    }
    switch(catid){
      case 1:
        this.configuracion.putEstado(this.cat).subscribe(
          resp =>{
          },error =>{
            Swal.fire(
              'Error',
              'Al editar requerimiento',
              'error'
            )
          }
        );
        break;
      case 2:
        if(type==1){
          this.configuracion.setUnidadMedida(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Unidad Medida',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putUnidadMedida(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al editar Unidad Medida',
                'error'
              )
            }
          );
        }
        break;
      case 3:
        if(type==1){
          this.configuracion.setAreaSolicitante(this.cat).subscribe(
            resp =>{
              this.consumeArea();
              this.configuracion.disparadorActualizar.emit();
              console.log("area");
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Aera Solictante',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putAreaSolicitante(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al editar Aera Solictante',
                'error'
              )
            }
          );
        }
        break;
      case 4:
        if(type==1){
          this.configuracion.setTipoPermiso(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoPermiso(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 5:
        if(type==1){
          this.configuracion.setTipoPermiso(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoPermiso(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 6:
        if(type==1){
          console.log(this.cat)
          this.configuracion.setTipoSolicitud(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoSolicitud(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 7:
        if(type==1){
          console.log(this.cat)
          this.configuracion.setTipoCobertura(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoCobertura(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 8:
        if(type==1){
          console.log(this.cat)
          this.configuracion.setTipoActividad(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoActividad(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
    }
  
  }

  guardaComentario(){
    this.comentariosForm.value.idUser=this.datosUser.sub;
    this.comentariosForm.value.usuario=this.datosUser.name;
    this.comentariosForm.value.idRequerimiento=this.data.array[0].id;
    this.comentariosForm.value.idComentarioReply=0;

    console.log("formComentarios",this.comentariosForm.value);
    this.creaService.addComentario(this.comentariosForm.value).subscribe(
      response=>{
        console.log(response);
      },error =>{

      }

      )
  }

  autoriza(){
    console.log("Aurtorizar")
    console.log(this.data.array[0].id);
    this.creaService.autorizaRequerimiento(this.data.array[0].id).subscribe(
       responseP=>{
        console.log(responseP);
       
      },error => {
          console.log(error);
          console.log(error.error.text);
          //this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.data.array[0].id)
          if(error.error.text==="Exito"){
            this.guardaComentario();
          }
      }
    )
  }

  rechazar(){
    console.log("Aurtorizar")
    console.log(this.data.array[0].id);
    this.creaService.cancelaRequerimiento(this.data.array[0].id).subscribe(
       responseP=>{
        console.log("Error");
        console.log(responseP);
       
      },error => {
        console.log("Exitos")
          console.log(error);
          console.log(error.error.text);
          //this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.data.array[0].id)
          if(error.error.text==="Exito"){
            this.guardaComentario();
          }
      }
    )
  }

}
