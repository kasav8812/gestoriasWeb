import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';
import { CrearService } from '../../services/crear.service';

@Component({
  selector: 'app-recibidas',
  templateUrl: './recibidas.component.html',
  styles: [
  ]
})
export class RecibidasComponent implements OnInit {

  constructor(private requeServvice: CrearService) { }
  requerimientos: CrearResponse[] ;

  ngOnInit(): void {
    if(localStorage.getItem('requerimiento') == null){ 
      this.requeServvice.getRequerimineto().subscribe(
        response => {
          this.requerimientos = response.filter(((el) => el.idestado==2));
        },
        error => {
          console.log(error);
        }
      )
    }else{
      let req: CrearResponse[] = JSON.parse(localStorage.getItem('requerimiento'))
      this.requerimientos = req.filter(((el) => el.idestado==2));
    }
  }

  editRequrimineto(req){
    localStorage.setItem('requerimiento', JSON.stringify(req));
  }
}
