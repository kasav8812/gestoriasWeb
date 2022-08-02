import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Catalogo, CatGeneric, RequerimientoGeneric } from '../pages/interfaces/configuracion.interface';
import { CrearResponse, FechaVigencia, RolesResponse, UserAreaModel, UserRelationShipModel, UsuariosResponse } from '../pages/interfaces/crear.interface';
import { ConfiguracionService } from '../pages/services/configuracion.service';
import { CrearService } from '../pages/services/crear.service';
import { Router } from '@angular/router';
import { plantillaCorreo } from '../pages/services/constantes.service';
import {MailService} from '../pages/services/mail.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['../style.scss']

})
export class AlertComponent {
  // @Output() public textoEmitido = new EventEmitter<string>();
  // @Output() reloadComponent: EventEmitter<any> = new EventEmitter();
  private plantilla: string = plantillaCorreo.cambioStatus;
  private plantillaRecover: string = plantillaCorreo.recoverMail;

  cat: CatGeneric;
  area: Catalogo[];
  municipio: Catalogo[] = null;
  regiones : Catalogo[] = null;
  userByEstado : UsuariosResponse[] = null;
  userRelation : UserRelationShipModel;
  userArea : UserAreaModel;
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
  unidad: Catalogo[];
  unidad2: Catalogo[];

  mResponseFechaVigencia : FechaVigencia;
  mFechasVigencia : FechaVigencia[];
  mSelectionRoleOP: Boolean = false;
  mAddEstados: Boolean = false;
  mUserId : string;
  mAdmon : string;
  mRole : string;

  mListEstadosToAdd : Catalogo[] = [];
  mListUsersOwn : UsuariosResponse [] = [];

  mListIdEstados :Catalogo[] = [];

  constructor(
    private router: Router,
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AlertComponent>, private creaService: CrearService,
    private serviceMail: MailService,
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
    region_usr:['',Validators.required],
    correo_usr:['',Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
    admon:['',Validators.required]
  })

  crearForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(2)]],
    descripcion: ['', Validators.required]
  })

  editarUsr: FormGroup = this.formBuilder.group({
    usr_nombre: ['', [Validators.required, Validators.maxLength(2)]],
    usr_region: ['', Validators.required],
    usr_email: ['', Validators.required]
  })

  fechaVigenciaForm : FormGroup = this.formBuilder.group({
    idReq:['', [Validators.required]],
    vigencia: ['', [Validators.required]],
    unidad:['', [Validators.required]],
    fechaRequerimiento:['', [Validators.required]],
    fechaVencimeinto: ['', [Validators.required]]
  })



  ngOnInit(): void {

    console.log("************************** init ****************************");
    try{
      console.log(this.data.array[0]);
      this.editarUsr = this.formBuilder.group({
        usr_nombre:[this.data.array[0].name],
        usr_region:[this.data.array[0].areaID],
        usr_email:[this.data.array[0].email]
      })
    }catch (e) {
      console.log(e);
    }
    
    this.creaService.get_catalogos().subscribe(
      response => {
        this.res = response;
        this.municipio = this.res.ubicacion;
        this.unidad = this.res.unidaMedida;
        this.unidad2 = this.unidad;
      },
      error => {
      }
    )

    this.creaService.getRegiones().subscribe(
      response => {
        this.regiones = response;
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
        try {
          this.getReqListCompleto();
        } catch (e) {
          console.log(e);
        }
      },
      error => {
        console.log(error);
      }
    )

    try {
      this.getUserByAdmin();
    } catch (e) {
      console.log(e);
    }

   
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

  autorizaRequerimiento() {
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
          this.detectEmail("Requerimiento Autorizado", "Autorizado");
          this.guardaComentario("Requerimiento Autorizado");
        }
      }
    )
  }

  rechazarRequerimiento() {
    console.log("rechazar")
    console.log(this.data.array[0].id);
    this.creaService.recibirRequerimiento(this.data.array[0].id).subscribe(
      responseP => {
        console.log("Error");
        console.log(responseP);

      }, error => {
        console.log("Exitos")
        console.log(error);
        console.log(error.error.text);
        this.detectEmail("Requerimiento Rechazado", "Rechazado");
        if (error.error.text === "Exito") {
          this.guardaComentario("Requerimiento Rechazado");
        }
      }
    )
  }



  detectEmail(mTitle : string, mState :string){
      this.sendMail(mTitle,JSON.parse(atob(this.token.split('.')[1])).name,mState,this.id.id,this.getEmail(this.datosUser.sub),this.mUserDataEmails[0].email);
      this.sendMail(mTitle,JSON.parse(atob(this.token.split('.')[1])).name,mState,this.id.id,this.getEmail(this.datosUser.sub),this.mUserDataEmails[1].email);
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
          this.detectEmail("Requerimiento Cerrado", "Cerrado");
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
    let param={
        "to": mToEmail,
        "cc": mFromEmail,
        "bcc": "",
        "reply_to": "no-reply@totalplay.com.mx",
        "subject": "ADMINISTRACION DE GESTORIAS CAMBIO DE ESTATUS " + idRequerimiento ,
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

  guardarFecha(){
    this.jsonCrear = {
      idReq: this.data.req.id,
      vigencia: this.fechaVigenciaForm.value.vigencia,
      unidad: this.fechaVigenciaForm.value.unidad,
      fechaReq: this.fechaVigenciaForm.value.fechaRequerimiento,
      fechaVigencia: this.fechaVigenciaForm.value.fechaVencimeinto
    }
    console.log(this.jsonCrear);

    this.creaService.setFechaVigencia(this.jsonCrear).subscribe(
      response => {
        this.mResponseFechaVigencia = response
        this.configuracion.disparadorActualizar.emit();
        if(this.mResponseFechaVigencia.idReq != ""){
          Swal.fire(
            'Fecha Agregada',
            'Nueva fecha agregada correctamente',
            'success'
          )
        }
      }, error => {
        console.log("Response Error")
      }
    )
  }

  updateFecha(idReq : number){
    this.creaService.updateFechaVigencia(idReq).subscribe(
      response => {
        this.mResponseFechaVigencia = response;
        if(this.mResponseFechaVigencia.idReq == ""){
          console.log("Success Update Requerimiento")
        }
      }, error => {
        console.log("Response Error")
      }
    )
  }

  getFechas(idReq:any){
    this.creaService.getFechasVigencia(idReq).subscribe(
      response => {
        this.mFechasVigencia = response;
        if(this.mFechasVigencia != null){
          console.log("Success Update Requerimiento")
        }
      }, error => {
        console.log("Response Error")
      }
    )
  }

  getEstadosByRegion(){
    this.creaService.getEstadosByRegion(this.crearFormUser.value.region_usr).subscribe(
      response => {
        this.municipio = response
      },
      error => {
      }
    )
  }

  getAdmonByRegion(event){
    console.log(event.target.value);
      this.creaService.getUserbByEstado(event.target.value).subscribe(
        response => {
          console.log("Success Admon");
          this.userByEstado = response;

        },
        error => {
          console.log(error);
        }
      )
  }

  showSelect(){
    console.log("********************************************** user role")
    console.log(this.crearFormUser.value.role_usr)
    if(this.crearFormUser.value.role_usr == "4"){
      this.mSelectionRoleOP = true;
    }
  }

  getAdmonSelect(event){
    console.log("Admon", event.target);
    console.log("Admon", this.crearFormUser.value.admon);
  
    this.mAdmon = this.userByEstado[0].username;
    console.log(this.mAdmon);
  }

  onSelected(item){
    console.log("My fucking index",  item);
  }

  
  addEstado(){
    this.mAddEstados = true
    console.log("Estados");
    console.log(this.crearFormUser.value.area_usr);

    for(var i=0;i<this.municipio.length;i++){
        if(this.crearFormUser.value.area_usr == this.municipio[i].id){
          this.mListEstadosToAdd.push(this.municipio[i]);
        }
    }
  }

  onSubmit(){
    console.log("Datos del form >>>>>>>>>>", this.crearFormUser);
   // if (!this.crearFormUser.invalid){
    this.mUserId = this.crearFormUser.value.usuario_usr;
    this.mAdmon = this.crearFormUser.value.admon;
    this.mRole = this.crearFormUser.value.role_usr;

    console.log(this.mRole);
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
        this.sendMailChange(responseP.name,responseP.username,responseP.email);
        if(this.mRole == "4"){
          this.saveRelationShip();
        }else{
          this.saveEstadosByUser();
        }
      }, error => {
        Swal.fire(
          "Error al crear el usuario",
          '',
          'error'
        )
      }
    )
  /*  }else{
      Swal.fire(
        "Error",
        'Es necesario llenar todos los campos',
        'error'
      )
    }*/
  }

  saveRelationShip(){
    this.jsonCrear = {
      tpguid_ad: this.userByEstado[0].username,
      tpguid_op: this.mUserId
    }

    console.log("RelationShip");
    console.log(this.jsonCrear);
    this.creaService.setRelationShip(this.jsonCrear).subscribe(
      response=>{
        console.log("Save RelationShip Success")
        this.saveEstadosByUser();
      },error =>{
        console.log("Save RelationShip Fail")
      }
    )
  }
  
  saveEstadosByUser(){
    var mMunicipios : any[] = [];

    for(var i=0;i<this.mListEstadosToAdd.length;i++){
      this.jsonCrear = {
        id:i,
        tpguid:  this.mUserId,
        tpgcuid: this.mListEstadosToAdd[i].id
      }

      mMunicipios.push(this.jsonCrear);
    }

    console.log("Areas Add ");
    console.log(mMunicipios);

    this.creaService.setAreasUsuarios(mMunicipios).subscribe(
      response=>{
        this.configuracion.disparadorActualizar.emit();
        console.log("Success Areas");
        
        this.router.navigateByUrl('gestorias/configuracion/crearUsuario');
      },error =>{
        console.log("Error Areas");
      }
    )
  }

  getUserByAdmin(){
    console.log(this.data.req.id);
    this.creaService.getUserByAdmin(this.data.req.id).subscribe(
      response => {
        this.mListUsersOwn = response;
        console.log(this.mListUsersOwn);
        console.log("Success Load Employed Owned")
      },
      error => {
        console.log("Error Load Employed Owned")
      }
    )
  }

  deleteArea(mPos:number){
    var mTemporal : Catalogo[] = [] 
    console.log("Position", i);


    for(var i=0;i<this.mListEstadosToAdd.length;i++){
      if( i != mPos){
        mTemporal.push(this.mListEstadosToAdd[i]);
      }
    }

    this.mListEstadosToAdd = mTemporal;
  }


  editarDatos(){
    this.jsonCrear = {
      id:this.data.array[0].id,
      username:this.data.array[0].username,
      name: this.editarUsr.value.usr_nombre,
      region: this.editarUsr.value.usr_region,
      email: this.editarUsr.value.usr_email
    }

    console.log("UPDATE ************");
    console.log(this.jsonCrear);

    this.creaService.updateUsr(this.jsonCrear).subscribe(
      response => {
        this.configuracion.disparadorActualizar.emit();
        console.log("Success update usr")
      },
      error => {
        console.log("Error Update usr")
      }
    )
  }

  sendMailChange(pass: any,user: any,mToEmail :string){
    console.log("MAILS");
  
    console.log(mToEmail);
  
  
    this.plantillaRecover=this.plantillaRecover.replace("#User",user);
    this.plantillaRecover=this.plantillaRecover.replace("#Pass",pass);
  
    let param={
        "to": mToEmail,
        "cc": mToEmail,
        "bcc": "",
        "reply_to": "no-reply@totalplay.com.mx",
        "subject": "ADMINISTRACION DE GESTORIAS ACTUALIZAR CONTRASEÑA ",
        "body": this.plantillaRecover,
        "from_Address": "",
        "from_Personal": ""
    }
  
    console.log("Este es la plantilla",this.plantillaRecover);
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


  addIdEstados(item:Catalogo){
    console.log(this.data.req.id);

    var mTempEstados : Catalogo [] = [];
    var isNewItem : Boolean = true;
    console.log(item);
    item.tpgregion = this.data.req.id;

    if(this.mListIdEstados.length <= 0){
      this.mListIdEstados.push(item);
    }else{
      for(var i=0;i<this.mListIdEstados.length;i++){
        if(this.mListIdEstados[i].id == item.id){
          isNewItem = false;
        }else{
          mTempEstados.push(this.mListIdEstados[i])
        }
      }
      if(isNewItem){
        mTempEstados.push(item);
      }
      this.mListIdEstados = mTempEstados;
    }

    console.log(this.mListIdEstados);
  }

  

  saveNewEstados(){
    this.creaService.setEstadosRegion(this.mListIdEstados).subscribe(
      response => {
        console.log("Success update List")
        Swal.fire(
          "Se han agreadado nuevos estados",
          '',
          'success'
        )
      },
      error => {
        Swal.fire(
          "Error al agregar estados",
          '',
          'error'
        )
        console.log("Error Update List")
      }
    )
  }


}
