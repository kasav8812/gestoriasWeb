import { HttpClient, HttpHeaders,HttpRequest,  HttpEvent,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearResponse,CrearComentario } from '../interfaces/crear.interface';
import { Catalogo, RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseurl: string = environment.urlFile;
  private baseurlreq: string = environment.urlRequerimiento;
  userToken: any;

  constructor(
    private http: HttpClient
  ) { }

  cres_Requerimiento(formdata: CrearResponse): Observable<CrearResponse>{
    const url = `${this.baseurlreq}/requerimiento`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<CrearResponse>(url,formdata,{headers});
  }

  upload(file: File, idRequerimiento: any): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('idRequerimiento', idRequerimiento);
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    const req = new HttpRequest('POST', `${this.baseurl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers,
    });
    return this.http.request(req);
  }

  getFiles(){
    const url = `${this.baseurl}/files`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get(url,{headers});
  }

  getFile(url: any):Observable<File>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<File>(url,{headers});
  }
}
