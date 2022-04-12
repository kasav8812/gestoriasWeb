import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { CrearService } from '../../services/crear.service';

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

  constructor(
    private requeServvice: CrearService
  ) {
    this.token = JSON.parse(sessionStorage.getItem('token'));
    let namespace = JSON.parse(atob(this.token.split('.')[1]));
    this.rol = namespace.roles[0];
   }

  ngOnInit(): void {
    this.links = document.querySelectorAll(".links li");
    if(localStorage.getItem('requerimiento') == null){
      this.requeServvice.getRequerimineto().subscribe(
        response => {
          this.requerimientos = response.filter(((el) => el.idestado==1));
        },
        error => {

        }
      )
    }else{
      let req: CrearResponse[] = JSON.parse(localStorage.getItem('requerimiento'))
      this.requerimientos = req.filter(((el) => el.idestado==1));
    }
  }
  editRequrimineto(req){
    localStorage.setItem('requerimiento', JSON.stringify(req));
  }

}
