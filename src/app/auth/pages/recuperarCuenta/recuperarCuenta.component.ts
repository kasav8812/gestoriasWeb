import { Component, OnInit } from '@angular/core';

import { CrearService } from '../../../gestorias/pages/services/crear.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosResponse } from 'src/app/gestorias/pages/interfaces/crear.interface';
import {MailService} from '../../../gestorias/pages/services/mail.service'
import { plantillaCorreo } from '../../../gestorias/pages/services/constantes.service';


@Component({
    selector: 'app-recuperarCuenta',
    templateUrl: './recuperarCuenta.component.html',
    styles: [
      `
      input{
        border: none;
        border-bottom: 1px solid #707070;
        border-radius: 0;
        background: none !important;
      }
      .input-group {
        background: none;
      }
      .form-floating>label {
        top: 1em;
      }
      .form-floating>.form-control:focus~label, .form-floating>.form-control:not(:placeholder-shown)~label, .form-floating>.form-select~label {
        top: -1px !important;
      }
      .input-group-text{
        background:none;
        border:none;
      }
      .form-control:focus {
        border-color: none;
        box-shadow:none;
      }
      button{
        border-radius: 2em;
      }
      label {
        margin-left: 2em !important;
      }
      span{
        padding-top: 5%;
      }
    `
    ]
  })

  export class recuperarCuentaComponent implements OnInit{
    userToken;
    mResponse : UsuariosResponse[] = [];
    private plantilla: string = plantillaCorreo.recoverMail;


    constructor(
      private formBuilder: FormBuilder,
      private creaService: CrearService,
      private authService: AuthService,
      private serviceMail: MailService
      ) { 
    }
    recuperarCuenta: FormGroup = this.formBuilder.group({
      correo: ['', [Validators.required]]
    });
  

    ngOnInit(): void {

    }

    recuperar(){
      console.log(this.recuperarCuenta.value.correo);
      this.creaService.getRecoverEmail(this.recuperarCuenta.value.correo).subscribe(
        response=>{
          this.mResponse = response;
          if(this.mResponse.length > 0){
            console.log("Succces Save Actviidades")
            console.log(response);
            this.sendMail(this.mResponse[0].name,this.mResponse[0].username,this.mResponse[0].email);
           
          }else{
            Swal.fire(
              'Aviso',
              'No se encontraron datos',
              'warning'
            )
          }
         
        },error =>{
          console.log("Error Save Actviidades");
          Swal.fire(
            'Aviso',
            'No se encontraron datos',
            'warning'
          )
        }
      )
    }

    getToken(){
      this.authService.login("3803810", "superAdmin").subscribe(
        response => {
          this.userToken = response;
          sessionStorage.setItem('token', JSON.stringify(this.userToken.token));
          let token = this.userToken.token;
          let tk = JSON.parse(atob(token.split('.')[1]));
          let role = tk.roles[0];
          this.recuperar();
          Swal.fire(
            'Listo',
            'Se han enviado tus credenciales a tu correo electrónico',
            'success'
          )
        },
        error => {
          Swal.fire(
            'Advertencia',
            'Intente ingresar más tarde',
            'warning'
          )
        }
      );
    }


    sendMail(pass: any,user: any,mToEmail :string){
      console.log("MAILS");
  
      console.log(mToEmail);
  
  
      this.plantilla=this.plantilla.replace("#User",user);
      this.plantilla=this.plantilla.replace("#Pass",pass);

      let param={
          "to": mToEmail,
          "cc": mToEmail,
          "bcc": "",
          "reply_to": "no-reply@totalplay.com.mx",
          "subject": "ADMINISTRACION DE GESTORIAS DATOS DE USUARIO ",
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