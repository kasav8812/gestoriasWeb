import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private baseurl: string = environment.urlRequerimiento;

  constructor(
    private http: HttpClient
  ) { }

  buscar(number: string){
    const url = `${this.baseurl}/requerimiento/${number}`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get(url,{headers});
  }
}
