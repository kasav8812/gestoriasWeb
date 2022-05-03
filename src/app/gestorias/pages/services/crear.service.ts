import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearResponse,CrearComentario } from '../interfaces/crear.interface';
import { Catalogo, RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrearService {

  private baseurl: string = environment.urlCatalogo;
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

  get_catalogos(){
    const url = `${this.baseurl}/catalogo`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get(url,{headers});
  }

  getUbicacionMunicipio(cuenta: number): Observable<Catalogo[]>{
    const url = `${this.baseurl}/catalogo/municipio/`+cuenta
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  postRequerimiento(formdata: RequerimientoGeneric):Observable<RequerimientoGeneric[]>{
    console.log(formdata)
    const url = `${this.baseurlreq}/requerimiento/add`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<RequerimientoGeneric[]>(url,formdata,{headers});
  }
// Obtener requerimientos
  getRequerimineto(): Observable<CrearResponse[]>{
    const url = `${this.baseurlreq}/requerimiento`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<CrearResponse[]>(url,{headers});
  }

  // Validar token
  getToken(){
    if(sessionStorage.getItem('token')){
      this.userToken = JSON.parse(sessionStorage.getItem('token'));
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  getRequeriminetoPorVencer(): Observable<CrearResponse[]>{
    const url = `${this.baseurlreq}/requerimiento/porVencer`
    let token=JSON.parse(sessionStorage.getItem('token'));
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    let tk = JSON.parse(atob(token.split('.')[1]));
    let id = tk.sub;
    let param={"id":id}  
    return this.http.post<CrearResponse[]>(url,param,{headers});
  }

  getRequeriminetosVencidos(): Observable<CrearResponse[]>{
    const url = `${this.baseurlreq}/requerimiento/vencidos`
    let token=JSON.parse(sessionStorage.getItem('token'));
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    let tk = JSON.parse(atob(token.split('.')[1]));
    let id = tk.sub;
    let param={"id":id}  
    return this.http.post<CrearResponse[]>(url,param,{headers});
  }

  postRequerimientoLista():Observable<CrearResponse[]>{
    const url = `${this.baseurlreq}/requerimiento/requerimientosEstado`
    let token=JSON.parse(sessionStorage.getItem('token'));
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    let tk = JSON.parse(atob(token.split('.')[1]));
    let id = tk.sub;
    let param={"id":id}  
    return this.http.post<CrearResponse[]>(url,param,{headers});
  }

  //Obtener requerimiento completo
  postRequerimientoCompletoLista(id: any):Observable<RequerimientoGeneric[]>{
    const url = `${this.baseurlreq}/requerimiento/completo`
    let token=JSON.parse(sessionStorage.getItem('token'));
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    });
    let param={"id":id}  
    return this.http.post<RequerimientoGeneric[]>(url,param,{headers});
  }
  postRequerimientoRelacion(formdata: any){
    console.log(formdata)
    const url = `${this.baseurlreq}/requerimiento/addRelacion`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post(url,formdata,{headers});
  }
  requerimientoReact(id:any): Observable<CrearResponse>{
    const url = `${this.baseurlreq}/requerimiento/reactivar`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<CrearResponse>(url,param,{headers});
  }
  getRequeriminetoId(id: any): Observable<CrearResponse[]>{
    const url = `${this.baseurlreq}/requerimiento/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<CrearResponse[]>(url,{headers});
  }
  //Autorizar requerimiento
  autorizaRequerimiento(id:any):Observable<string>{
    const url = `${this.baseurlreq}/status/autoriza`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<string>(url,param,{headers});
  }
  cancelaRequerimiento(id:any):Observable<string>{
    const url = `${this.baseurlreq}/status/cancela`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<string>(url,param,{headers});
  }
  addComentario(param: any):Observable<string>{
    const url = `${this.baseurlreq}/comentarios/add`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<string>(url,param,{headers});
  }
  getComentariosId(id: any): Observable<CrearComentario[]>{
    const url = `${this.baseurlreq}/comentarios/get`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<CrearComentario[]>(url,param,{headers});
  }
  getRequerimientosId(id: any): Observable<CrearResponse[]>{
    const url = `${this.baseurlreq}/requerimiento/getId`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<CrearResponse[]>(url,param,{headers});
  }
}
