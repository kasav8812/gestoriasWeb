import { Component, OnInit } from '@angular/core';

import { CrearService } from '../../../gestorias/pages/services/crear.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosResponse } from 'src/app/gestorias/pages/interfaces/crear.interface';
import { MailService } from '../../../gestorias/pages/services/mail.service'
import { plantillaCorreo } from '../../../gestorias/pages/services/constantes.service';

@Component({
    selector: 'app-reestablecer',
    templateUrl: './reestablecer.component.html',
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

export class reestablecerComponent implements OnInit {

    userToken;
    name: any;
    urlTree: any;
    requerimiento: any;
    isActive: boolean = true;
    jsonCrear:any;


    constructor(
        private formBuilder: FormBuilder,
        private creaService: CrearService,
        private router: Router,
        private authService: AuthService,
        private serviceMail: MailService
    ) {
    }

    recuperarCuenta: FormGroup = this.formBuilder.group({
        usr: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]]
    });


    ngOnInit(): void {

    }

    change() {
        this.isActive = !(this.isActive);
    }

    getToken() {
        this.authService.login("3803810", "superAdmin").subscribe(
            response => {
                this.userToken = response;
                sessionStorage.setItem('token', JSON.stringify(this.userToken.token));
                let token = this.userToken.token;
                let tk = JSON.parse(atob(token.split('.')[1]));
                let role = tk.roles[0];
                this.recover();
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

    recover() {
        this.jsonCrear = {
            username: this.recuperarCuenta.value.usr,
            password: this.recuperarCuenta.value.password,
          }      
            this.creaService.recoverPass(this.jsonCrear).subscribe(
            response=>{
                Swal.fire(
                    'Listo',
                    'Se ha reestablecido la contraseña',
                    'success'
                )
                this.router.navigateByUrl('');
            },error =>{
              console.log("Error Save Actviidades");
              Swal.fire(
                'Aviso',
                'Error al reestablecer la contraseña',
                'warning'
              )
            }
          )

    }

}