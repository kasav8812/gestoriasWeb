import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Catalogo, CatGeneric } from '../interfaces/configuracion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private baseurl: string = environment.urlCatalogo;

  @Output() disparadorActualizar: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }



  getAreaSolicitante() : Observable<Catalogo[]>{
    const url = `${this.baseurl}/area-solitante`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  getEstadoRequerimiento(): Observable<Catalogo[]>{
    const url = `${this.baseurl}/estado-requerimiento`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '  + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  getTipoPermiso(): Observable<Catalogo[]>{
    const url = `${this.baseurl}/tipo-permiso`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '  + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  getUnidadMedida() : Observable<Catalogo[]>{
    const url = `${this.baseurl}/unidad-medida`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '  + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  putEstado(cat){
    const url = `${this.baseurl}/estado-requerimiento`;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.put(url, cat,{headers});
  }

  setAreaSolicitante(cat){
    const url = `${this.baseurl}/area-solitante`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,cat,{headers});
  }
  putAreaSolicitante(cat){
    console.log(cat)
    const url = `${this.baseurl}/area-solitante`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.put(url,cat,{headers});
  }

  setUnidadMedida(cat){
    const url = `${this.baseurl}/unidad-medida`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,cat,{headers});
  }
  putUnidadMedida(cat){
    const url = `${this.baseurl}/unidad-medida`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.put(url,cat,{headers});
  }
  setTipoPermiso(cat){
    const url = `${this.baseurl}/tipo-permiso`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,cat,{headers});
  }
  putTipoPermiso(cat){
    const url = `${this.baseurl}/tipo-permiso`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });

    return this.http.put(url,cat,{headers});
  }
  setTipoSolicitud(cat){
    const url = `${this.baseurl}/tipo-solicitud`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,cat,{headers});
  }
  getTipoSolicitud() : Observable<Catalogo[]>{
    const url = `${this.baseurl}/tipo-solicitud`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  putTipoSolicitud(cat){
    const url = `${this.baseurl}/tipo-solicitud`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.put(url,cat,{headers});
  }
  setTipoCobertura(cat){
    const url = `${this.baseurl}/cobertura`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,cat,{headers});
  }

  getTipoCobertura() : Observable<Catalogo[]>{
    const url = `${this.baseurl}/cobertura`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  putTipoCobertura(cat){
    const url = `${this.baseurl}/cobertura`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.put(url,cat,{headers});
  }
  setTipoActividad(cat){
    const url = `${this.baseurl}/tipo-actividad`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,cat,{headers});
  }

  getTipoActividad() : Observable<Catalogo[]>{
    const url = `${this.baseurl}/tipo-actividad`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  putTipoActividad(cat){
    const url = `${this.baseurl}/tipo-actividad`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.put(url,cat,{headers});
  }

}
