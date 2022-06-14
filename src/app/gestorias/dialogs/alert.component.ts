import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Catalogo, CatGeneric, RequerimientoGeneric } from '../pages/interfaces/configuracion.interface';
import { CrearResponse, RolesResponse, UsuariosResponse } from '../pages/interfaces/crear.interface';
import { ConfiguracionService } from '../pages/services/configuracion.service';
import { CrearService } from '../pages/services/crear.service';
import { Router } from '@angular/router';
import { plantillaCorreo } from '../pages/services/constantes.service';
import {MailService} from '../pages/services/mail.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent {
  // @Output() public textoEmitido = new EventEmitter<string>();
  // @Output() reloadComponent: EventEmitter<any> = new EventEmitter();
  private plantilla: string = plantillaCorreo.cambioStatus;
  cat: CatGeneric;
  area: Catalogo[];
  municipio: Catalogo[] = null;
  res: any;
  roles: RolesResponse[];
  jsonCrear:any;
  token: any;
  datosUser: any;
  mUsuearios : UsuariosResponse[];
  mUserDataEmails: UsuariosResponse[] = [];
  requerimiento: RequerimientoGeneric;
  requerimientoBase : CrearResponse;
  rol: any;
  id:any = JSON.parse(localStorage.getItem('requerimiento'));

  constructor(
    private router: Router,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AlertComponent>, private creaService: CrearService,
    private serviceMail: MailService
  ) {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    this.datosUser = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = this.datosUser.roles[0];

  }

  comentariosForm: FormGroup = this.formBuilder.group({
    idUser: ['', Validators.required],
    usuario: ['', Validators.required],
    comentario: ['', Validators.required],
    idRequerimiento: ['', Validators.required],
    idComentarioReply: ['', Validators.required]
  })

  crearFormUser: FormGroup = this.formBuilder.group({
    nombre_usr:['',Validators.required],
    usuario_usr:['',Validators.required],
    password_usr:['',Validators.required],  
    role_usr:['',Validators.required],
    area_usr:['',Validators.required],
    correo_usr:['',Validators.required]
  })

  crearForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(2)]],
    descripcion: ['', Validators.required]
  })

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

    this.creaService.getAllUsers().subscribe(
      response => {
        console.log("SUCCESS ALL USERS");
        this.mUsuearios = response;
        this.getReqListCompleto();
      },
      error => {
        console.log(error);
      }
    )

  }


  getRequerimientoBase(){
    this.creaService.getRequerimientosId(this.id.id).subscribe(
      response => {
        this.requerimientoBase=response[0];
        this.getListUsersToSendEmail();
      },error=>{
        console.log("Response Error")
        console.log(error);
      }
      )
  }

  getReqListCompleto(){
    this.creaService.postRequerimientoCompletoLista(this.id.id).subscribe(
      response => {
        console.log("DATA AUTHORIZATION SUCCESS")
        this.requerimiento=response[0];
        this.getRequerimientoBase();
      },
      error => {
        console.log("DATA AUTHORIZATION ERROR")
        console.log(error);
      }
    )
  }

  getListUsersToSendEmail(){
    if(this.rol == "ROLE_AUTORIZACION") { 
      console.log(this.requerimiento.idUserAdmon);
      console.log(this.requerimientoBase.idUser);
      this.mUserDataEmails[0] = this.getEmailObj(this.requerimiento.idUserAdmon);
      this.mUserDataEmails[1] = this.getEmailObj(this.requerimientoBase.idUser);
    } 
  }

  getEmailObj(mEmailTemp):UsuariosResponse{
    var mEmail : UsuariosResponse;
    for (var i = 0; i < this.mUsuearios.length; i++){
      if(this.mUsuearios[i].username == mEmailTemp){
        mEmail = this.mUsuearios[i];
      }
    }
    return mEmail
  }

  editRequrimineto(requerimiento) {
    localStorage.setItem('requerimiento', JSON.stringify(requerimiento));
    localStorage.setItem('tipo', 'Reactivar');
  }

  consumeArea() {
    this.configuracion.getAreaSolicitante().subscribe(
      resp => {
        this.area = resp;
        localStorage.removeItem('area');
        localStorage.setItem('area', JSON.stringify(this.area));
      }
    );
  }

  generico(type: number, id: number, catid: number) {
    console.log(catid)
    this.cat = {
      activo: 1,
      id: id,
      descripcion: this.crearForm.value.nombre,
      comentario: this.crearForm.value.descripcion,
    }
    switch (catid) {
      case 1:
        this.configuracion.putEstado(this.cat).subscribe(
          resp => {
          }, error => {
            Swal.fire(
              'Error',
              'Al editar requerimiento',
              'error'
            )
          }
        );
        break;
      case 2:
        if (type == 1) {
          this.configuracion.setUnidadMedida(this.cat).subscribe(
            resp => {
              this.configuracion.disparadorActualizar.emit();
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Unidad Medida',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putUnidadMedida(this.cat).subscribe(
            resp => {
            }, error => {
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
        if (type == 1) {
          this.configuracion.setAreaSolicitante(this.cat).subscribe(
            resp => {
              this.consumeArea();
              this.configuracion.disparadorActualizar.emit();
              console.log("area");
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Aera Solictante',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putAreaSolicitante(this.cat).subscribe(
            resp => {
            }, error => {
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
        if (type == 1) {
          this.configuracion.setTipoPermiso(this.cat).subscribe(
            resp => {
              this.configuracion.disparadorActualizar.emit();
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putTipoPermiso(this.cat).subscribe(
            resp => {
            }, error => {
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
        if (type == 1) {
          this.configuracion.setTipoPermiso(this.cat).subscribe(
            resp => {
              this.configuracion.disparadorActualizar.emit();
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putTipoPermiso(this.cat).subscribe(
            resp => {
            }, error => {
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
        if (type == 1) {
          console.log(this.cat)
          this.configuracion.setTipoSolicitud(this.cat).subscribe(
            resp => {
              this.configuracion.disparadorActualizar.emit();
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putTipoSolicitud(this.cat).subscribe(
            resp => {
            }, error => {
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
        if (type == 1) {
          console.log(this.cat)
          this.configuracion.setTipoCobertura(this.cat).subscribe(
            resp => {
              this.configuracion.disparadorActualizar.emit();
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putTipoCobertura(this.cat).subscribe(
            resp => {
            }, error => {
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
        if (type == 1) {
          console.log(this.cat)
          this.configuracion.setTipoActividad(this.cat).subscribe(
            resp => {
              this.configuracion.disparadorActualizar.emit();
            }, error => {
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        } else {
          this.configuracion.putTipoActividad(this.cat).subscribe(
            resp => {
            }, error => {
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

  guardaComentario(title:string) {
    this.comentariosForm.value.idUser = this.datosUser.sub;
    this.comentariosForm.value.usuario = this.datosUser.name;
    this.comentariosForm.value.idRequerimiento = this.data.array[0].id;
    this.comentariosForm.value.idComentarioReply = 0;

    console.log("formComentarios", this.comentariosForm.value);
    if (this.comentariosForm.value.comentario != "") {
      this.creaService.addComentario(this.comentariosForm.value).subscribe(
        response => {
            
        }, error => {
          console.log("Error");
          Swal.fire(
            title,
            '',
            'success'
          )
          this.router.navigateByUrl('/gestorias/requerimientos/encurso');
          console.log("Acnkas");
          console.log(error.text);
        }

      )
    }else{
      Swal.fire(
        title,
        '',
        'success'
      )
      this.router.navigateByUrl('/gestorias/requerimientos/encurso');
    }
  }

  autoriza() {
    console.log("Aurtorizar")
    console.log(this.data.array[0].id);
    this.creaService.autorizaRequerimiento(this.data.array[0].id).subscribe(
      responseP => {
        console.log(responseP);

      }, error => {
        console.log(error);
        console.log(error.error.text);
        //this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.data.array[0].id)
        if (error.error.text === "Exito") {
          this.detectEmail();
          this.guardaComentario("Requerimiento Autorizado");
        }
      }
    )
  }

  rechazar() {
    console.log("Aurtorizar")
    console.log(this.data.array[0].id);
    this.creaService.recibirRequerimiento(this.data.array[0].id).subscribe(
      responseP => {
        console.log("Error");
        console.log(responseP);

      }, error => {
        console.log("Exitos")
        console.log(error);
        console.log(error.error.text);
        //this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.data.array[0].id)
        if (error.error.text === "Exito") {
          this.guardaComentario("Requerimiento Rechazado");
        }
      }
    )
  }

  onSubmit(){
    console.log("Datos del form", this.crearFormUser);
    this.jsonCrear = {
      name: this.crearFormUser.value.nombre_usr,
      username: this.crearFormUser.value.usuario_usr,
      password: this.crearFormUser.value.password_usr,
      rol: [this.crearFormUser.value.role_usr],
      areaID: this.crearFormUser.value.area_usr,
      email: this.crearFormUser.value.correo_usr
    }

    console.log("Estructura JSON #••############")
    console.log(this.jsonCrear);
    this.creaService.crearUsuario(this.jsonCrear).subscribe(
      responseP => {
        Swal.fire(
          "Usuario creado",
          '',
          'success'
        )
        this.router.navigateByUrl('gestorias/configuracion/crearUsuario');

      }, error => {
        Swal.fire(
          "Error al crear el usuario",
          '',
          'error'
        )
      }
    )
  }

  detectEmail(){
      this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.id.id,this.getEmail(this.datosUser.sub),this.mUserDataEmails[0].email);
      this.sendMail("Autorización de requerimiento",JSON.parse(atob(this.token.split('.')[1])).name,"Autorizado",this.id.id,this.getEmail(this.datosUser.sub),this.mUserDataEmails[1].email);
  }

  getEmail(mEmailTemp):string{
    var mEmail : string = "";
    for (var i = 0; i < this.mUsuearios.length; i++){
      if(this.mUsuearios[i].username == mEmailTemp){
        mEmail = this.mUsuearios[i].email; 
      }
    }
    return mEmail
  }


  cerrarReq(){
    console.log(this.data.array[0].id);
    this.creaService.cerrarRequerimiento(this.data.array[0].id).subscribe(
      responseP=>{
       console.log(responseP);
      
     },error => {
         console.log(error);
         if(error.error.text==="Exito"){
          this.detectEmail();
           Swal.fire(
             'Requerimiento Cerrado',
             '',
             'success'
           )
           this.router.navigateByUrl('/gestorias/requerimientos/cerradas');
         }
     }
    )
  }

  sendMail(tipo: any,user: any,accion: any, idRequerimiento: any, mFromEmail: string, mToEmail :string){
    console.log("MAILS");

    console.log(mFromEmail);
    console.log(mToEmail);


    this.plantilla=this.plantilla.replace("#Tipo",tipo);
    this.plantilla=this.plantilla.replace("#User",user);
    this.plantilla=this.plantilla.replace("#Accion",accion);
    this.plantilla=this.plantilla.replace("#IdRequerimiento",idRequerimiento);
    this.plantilla=this.plantilla.replace("#IdRequerimiento",idRequerimiento);
    this.plantilla=this.plantilla.replace("#IdRequerimiento",idRequerimiento);
    let param={
        "to": mToEmail,
        "cc": mFromEmail,
        "bcc": "",
        "reply_to": "no-reply@totalplay.com.mx",
        "subject": "Se Modificado el status",
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

}
