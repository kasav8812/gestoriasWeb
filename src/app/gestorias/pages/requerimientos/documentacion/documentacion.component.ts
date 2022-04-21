import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { CrearService } from '../../services/crear.service';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styles: [
  ]
})
export class DocumentacionComponent implements OnInit {

  constructor(private requeServvice: CrearService) { }
  requerimientos: CrearResponse[];

  ngOnInit(): void {
    //if(localStorage.getItem('requerimiento') == null){ 
      this.requeServvice.postRequerimientoLista().subscribe(
        response => {
          this.requerimientos = response.filter(((el) => el.idestado==6));
        },
        error => {
          console.log(error);
        }
      )
    /*}else{
      let req: CrearResponse[] = JSON.parse(localStorage.getItem('requerimiento'))
      this.requerimientos = req.filter(((el) => el.idestado==6));
    }*/
  }

  editRequrimineto(req){
    localStorage.setItem('requerimiento', JSON.stringify(req));
  }

}
