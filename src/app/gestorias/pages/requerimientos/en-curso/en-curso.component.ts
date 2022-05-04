import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { CrearService } from '../../services/crear.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-en-curso',
  templateUrl: './en-curso.component.html',
  styles: [
  ]
})
export class EnCursoComponent implements OnInit {

  links: any;
  token: any;
  rol: any;
  requerimientos: CrearResponse[];
  req:any;

  constructor(
    private requeServvice: CrearService,private router: Router
  ) {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }

  ngOnInit(): void {
    this.links = document.querySelectorAll(".links li");
    this.req=sessionStorage.getItem('req');
    console.log("req",this.req);
    if(this.req !== null && this.req!='undefined'){
      this.visualizaRequerimiento();
    }else{
      //if(localStorage.getItem('requerimiento') == null){
        this.requeServvice.postRequerimientoLista().subscribe(
          response => {
            this.requerimientos = response.filter(((el) => el.idestado!==4 && el.idestado!==7 && el.idestado!==2));
          },
          error => {

          }
        )
      /*}else{
        let req: CrearResponse[] = JSON.parse(localStorage.getItem('requerimiento'))
        this.requerimientos = req.filter(((el) => el.idestado==1));
      }*/
    }
  }
  editRequrimineto(req){
    localStorage.setItem('requerimiento', JSON.stringify(req));
  }

  visualizaRequerimiento(){
    this.requeServvice.getRequeriminetoId(this.req).subscribe(
        response => {
          localStorage.setItem('requerimiento', JSON.stringify(response[0]));
          sessionStorage.removeItem("req");
          this.router.navigateByUrl('/gestorias/requerimiento');
        },
        error => {
          console.log(error);
        }
      )
  }
}
