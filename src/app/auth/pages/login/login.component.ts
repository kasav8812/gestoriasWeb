import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SpinnerService } from './../services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit{

  userToken;
  name: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    ) { }

  isActive: boolean= true;

  milogin: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {

  }


  login() {
    const { user, password } = this.milogin.value;
    this.authService.login(user, password).subscribe(
      response => {
        this.userToken = response;
        sessionStorage.setItem('token', JSON.stringify(this.userToken.token));
        let token = this.userToken.token;
        let tk = JSON.parse(atob(token.split('.')[1]));
        let role = tk.roles[0];
        if(role == 'ROLE_CONFIGURACION'){
          this.router.navigateByUrl('gestorias/configuracion');
        }else {
          this.router.navigateByUrl('gestorias');
        }
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

  change(){
    this.isActive=!(this.isActive);
  }

}
