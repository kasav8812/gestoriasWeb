import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { CrearService } from '../../services/crear.service';

@Component({
  selector: 'app-por-autorizar',
  templateUrl: './por-autorizar.component.html',
  styles: [
  ]
})
export class PorAutorizarComponent implements OnInit {

  token: any;
  rol: any;
  req:any;

  constructor(private requeServvice: CrearService) { 
    this.token = JSON.parse(sessionStorage.getItem('token'));
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
  }
  requerimientos: CrearResponse[];
  status:any;



  
  ngOnInit(): void {
    //if(localStorage.getItem('requerimiento') == null){ 
      this.requeServvice.postRequerimientoLista().subscribe(
        response => {
          if(this.rol == "ROLE_AUTORIZACION" || this.rol == "ROLE_COMERCIAL" || this.rol == "ROLE_OPERACIONES" ){
            this.requerimientos = response.filter(((el) => el.idestado==3));
          }
        },
        error => {
          console.log(error);
        }
      )
   /* }else{
      let req: CrearResponse[] = JSON.parse(localStorage.getItem('requerimiento'))
      this.requerimientos = req.filter(((el) => el.idestado==3));
    }*/
  }

  editRequrimineto(req){
    localStorage.setItem('requerimiento', JSON.stringify(req));
  }
  
}
