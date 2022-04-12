import { Component, OnInit } from '@angular/core';
import { CrearResponse } from '../../interfaces/crear.interface';

@Component({
  selector: 'app-dtos-requerimiento',
  templateUrl: './dtos-requerimiento.component.html',
  styles: [
  ]
})
export class DtosRequerimientoComponent implements OnInit {

  constructor() { }

  requerimiento: CrearResponse;

  ngOnInit(): void {
    this.requerimiento = JSON.parse(localStorage.getItem('requerimiento') )
  }

}
