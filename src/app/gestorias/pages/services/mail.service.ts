import { HttpClient, HttpHeaders,HttpRequest,  HttpEvent,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearResponse,CrearComentario } from '../interfaces/crear.interface';
import { Catalogo, RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  private urlToken: string = environment.urlMailToken;
  private urlMail: string = environment.urlMailSend;
  private userMail: string = environment.userMail;
  private passMail: string = environment.passMail;
  private tokenMail: string = environment.tokenMail;
  userToken: any;

  constructor(
    private http: HttpClient
  ) { }

  
  

  getToken():Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.tokenMail
    });
    let param={
      User:this.userMail,
      Pass:this.passMail
    }
    return this.http.post<any>(this.urlToken,param,{headers});
  }

  sendMail(param: any,token: any):Observable<any>{
    let headers= new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    return this.http.post<any>(this.urlMail,param,{headers});
  }
  
}
