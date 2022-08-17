import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearService } from '../../services/crear.service';

import Swal from 'sweetalert2';
import { UsuariosResponse } from '../../interfaces/crear.interface';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: [
  ]
})
export class CrearUsuarioComponent implements OnInit {
    usuarios: UsuariosResponse[];
    area: Catalogo[];
    mListEnablePersonal : Boolean = false;
    mBackup : UsuariosResponse[] = [];
    jsonCrear:any;

    buscarForm: FormGroup = this.fb.group({
      buscar: ['', [Validators.required]]
    });
    
    constructor(private configuracion: ConfiguracionService,
        public dialog: MatDialog, private creaService: CrearService,private router: Router,private fb: FormBuilder) { }
    
      ngOnInit(): void {
        this.creaService.getAllUsers().subscribe(
          response => {
            this.usuarios = response;
            this.mBackup = this.usuarios;
            console.log(this.usuarios[0].role);
          },
          error => {
            console.log(error);
          }
        )

        this.configuracion.getAreaSolicitante().subscribe(
          response => {
            this.area = response;
          },
          error => {
    
          }
        );

        this.configuracion.disparadorActualizar.subscribe(
          response => {
              this.getAllUsers();
          })

      }

     

      create(){
        const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            data: {
              tipo: 8,
              req: ""
            }
          })

      
    }

    getAllUsers(){
      this.creaService.getAllUsers().subscribe(
        response => {
          this.usuarios = response;
          console.log(this.usuarios[0].role);
          this.getAllArea();
        },
        error => {
          console.log(error);
        }
      )
    }


    getAllArea(){
      this.configuracion.getAreaSolicitante().subscribe(
        response => {
          this.area = response;
        },
        error => {
  
        }
      );
    }

    buscar(){

      if(this.buscarForm.valid){
        
      }else {
        Swal.fire(
          'Advertencia',
          'Ingrese un número de requerimiento válido',
          'warning'
        )
      }
  
    }


  loadEmployes(mUser: UsuariosResponse){
    console.log(mUser.username);
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        tipo: 12,
        title: "",
        req: {id:mUser.username}
      }
    })
  }
  
  onInput(event: any) {
    var mTemp : UsuariosResponse[] = [];     

    console.log("Asigna toda la lista",this.mBackup);

    console.log(event.target.value);
    for(var i = 0; i< this.usuarios.length ; i++){
        if(this.usuarios[i].name.toUpperCase().includes(event.target.value.toUpperCase()) || this.usuarios[i].username.toUpperCase().includes(event.target.value.toUpperCase())) {
          mTemp.push(this.usuarios[i]);
        }
    }


    if(event.target.value == ''){
      console.log("Asigna toda la lista",this.mBackup);
      this.usuarios = this.mBackup;
    }else{
      console.log("Asigna toda la busqueda");
      this.usuarios = mTemp;
    }
    
 }

 editItem(item:UsuariosResponse){
  console.log(item.username);
  const dialogRef = this.dialog.open(AlertComponent, {
    disableClose: true,
    data: {
      tipo: 13,
      title: "",
      array: [item]
    }
  })
 }

 enableUser(item:UsuariosResponse){
 
  if(item.enabled == true){
    Swal.fire({
      title: '¿Esta seguro que desea desactivar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeValue(item,false);
        Swal.fire(
          'Desactivada',
          'Se desactivo correctamente',
          'success'
        )
      }
    })
  }else {
    Swal.fire({
      title: '¿Esta seguro que desea activar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeValue(item,true);
        Swal.fire(
          'Activada',
          'Se activo correctamente',
          'success'
        )
      }
    })
  }
  this.ngOnInit();
 }

 changeValue(mData: UsuariosResponse, mEnabled : boolean){
  this.jsonCrear = {
    id: mData.id,
    username: mData.username,
    name: mData.name,
    region: mData.areaID,
    email: mData.email,
    enabled : mEnabled
  }

  this.creaService.updateUsr(this.jsonCrear).subscribe(
    response => {
      this.ngOnInit();
      console.log("Success update usr")
    },
    error => {
      console.log("Error Update usr")
    }
  )
}


}