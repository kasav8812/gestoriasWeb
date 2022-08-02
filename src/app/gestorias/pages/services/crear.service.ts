import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearResponse,CrearComentario, UsuariosResponse, RolesResponse, FechaVigencia, UserAreaModel, UserRelationShipModel, RegionEdoModel } from '../interfaces/crear.interface';
import { ActividadesModel, Catalogo, CentroCModel, RequerimientoGeneric } from '../interfaces/configuracion.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrearService {

  private baseurl: string = environment.urlCatalogo;
  private baseurlreq: string = environment.urlRequerimiento;
  private baseurlusr: string = environment.urlUser;

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

  updateRequerimiento(formdata: CrearResponse): Observable<CrearResponse>{
    const url = `${this.baseurlreq}/requerimiento/updateRequerimiento`
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

  cerrarRequerimiento(id:any):Observable<string>{
    const url = `${this.baseurlreq}/status/cerrar`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<string>(url,param,{headers});
  }

  recibirRequerimiento(id:any):Observable<string>{
    const url = `${this.baseurlreq}/status/recibir`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<string>(url,param,{headers});
  }

  cambiarStatusRequerimiento(id:any):Observable<string>{
    const url = `${this.baseurlreq}/status/cerrar`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    let param={"id":id}  
    return this.http.post<string>(url,param,{headers});
  }

  porAutorizarRequerimiento(id:any):Observable<string>{
    const url = `${this.baseurlreq}/status/porAutorizar`
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

  postDocumentcion(body:FormData):Observable<any>{
    const url= `${this.baseurlreq}/file/upload`;
    return this.http.post(url,body);
  }

  getAllUsers() :Observable<UsuariosResponse[]>{
    const url = `${this.baseurlusr}/user`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<UsuariosResponse[]>(url,{headers});
  }

  getAllRoles() :Observable<RolesResponse[]>{
    const url = `${this.baseurlusr}/rol`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<RolesResponse[]>(url,{headers});
  }

  updateRequerimientoAddon(formdata: RequerimientoGeneric): Observable<RequerimientoGeneric>{
    const url = `${this.baseurlreq}/requerimiento/add/updateAddon`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<RequerimientoGeneric>(url,formdata,{headers});
  }

  crearUsuario(formdata: UsuariosResponse): Observable<UsuariosResponse>{
    const url = `${this.baseurlusr}/user`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<UsuariosResponse>(url,formdata,{headers});
  }

  addAreasUser(formdata: UsuariosResponse): Observable<UsuariosResponse>{
    const url = `${this.baseurlusr}/user`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<UsuariosResponse>(url,formdata,{headers});
  }
  
  setFechaVigencia(formdata: FechaVigencia): Observable<FechaVigencia>{
    const url = `${this.baseurlreq}/requerimiento/setFechaVigencia`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<FechaVigencia>(url,formdata,{headers});
  }

  getFechasVigencia(id: any): Observable<FechaVigencia[]>{
    const url = `${this.baseurlreq}/requerimiento/getFechas/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<FechaVigencia[]>(url,{headers});
  }

  updateFechaVigencia(id:any): Observable<FechaVigencia>{
    const url = `${this.baseurlreq}/requerimiento/updateFechaVigencia/` + id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<FechaVigencia>(url,{headers});
  }

  deleteFechaVigencia(id:any): Observable<String>{
    const url = `${this.baseurlreq}/requerimiento/deleteFechaVigencia/` + id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<string>(url,{headers});
  }


  getRegiones(): Observable<Catalogo[]>{
    const url = `${this.baseurl}/catalogo/regiones`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  getEstadosByRegion(id: any): Observable<Catalogo[]>{
    const url = `${this.baseurl}/catalogo/getEstadosByRegion/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }


  setAreasUsuarios(formdata: UserAreaModel[]): Observable<UserAreaModel>{
    const url = `${this.baseurlusr}/user/usuariosAreas`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<UserAreaModel>(url,formdata,{headers});
  }

  setRelationShip(formdata: UserRelationShipModel): Observable<UserRelationShipModel>{
    const url = `${this.baseurlusr}/user/addUserRelationShip`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<UserRelationShipModel>(url,formdata,{headers});
  }
  

  getUserbByEstado(id: any): Observable<UsuariosResponse[]>{
    const url = `${this.baseurlusr}/user/getUserByEstado/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<UsuariosResponse[]>(url,{headers});
  }


  getUserByAdmin(id: any): Observable<UsuariosResponse[]>{
    const url = `${this.baseurlusr}/user/getUserByAdmin/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<UsuariosResponse[]>(url,{headers});
  }

  

  updateUsr(user: UsuariosResponse): Observable<UsuariosResponse>{
    const url = `${this.baseurlusr}/user/updateUsr`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<UsuariosResponse>(url,user,{headers});
  }


  getActividadesByReq(id: any): Observable<Catalogo[]>{
    const url = `${this.baseurl}/catalogo/getActividadesByReq/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<Catalogo[]>(url,{headers});
  }

  setActividades(act: ActividadesModel[]): Observable<ActividadesModel>{
    const url = `${this.baseurlreq}/requerimiento/setActividades`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<ActividadesModel>(url,act,{headers});
  }

  deleteUser(id:any):Observable<UsuariosResponse>{
    const url = `${this.baseurlusr}/user/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.delete<UsuariosResponse>(url,{headers});
  }

  getRecoverEmail(id: any): Observable<UsuariosResponse[]>{
    const url = `${this.baseurlusr}/user/recoverEmailUser/`+id
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<UsuariosResponse[]>(url,{headers});
  }

  recoverPass(act: UsuariosResponse): Observable<UsuariosResponse>{
    const url = `${this.baseurlusr}/user/changePass`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<UsuariosResponse>(url,act,{headers});
  }

  saveListEstados(formdata: Catalogo[]):Observable<Catalogo[]>{
    console.log(formdata)
    const url = `${this.baseurl}/catalogo/updateEstados`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<Catalogo[]>(url,formdata,{headers});
  }


  deleteEstado(formdata: Catalogo):Observable<Catalogo>{
    console.log(formdata)
    const url = `${this.baseurl}/catalogo/deleteEstado`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<Catalogo>(url,formdata,{headers});
  }



  setEstadosRegion(formdata: Catalogo[]):Observable<Catalogo>{
    console.log(formdata)
    const url = `${this.baseurl}/catalogo/setRegionEdo`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<Catalogo>(url,formdata,{headers});
  }


  setCC(formdata: CentroCModel[]):Observable<CentroCModel[]>{
    console.log(formdata)
    const url = `${this.baseurl}/catalogo/setCC`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<CentroCModel[]>(url,formdata,{headers});
  }

  getAllCC(): Observable<CentroCModel[]>{
    const url = `${this.baseurl}/catalogo/getAllCC`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<CentroCModel[]>(url,{headers});
  }

  getAllCCEnabled(): Observable<CentroCModel[]>{
    const url = `${this.baseurl}/catalogo/getAllCCEnabled`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.get<CentroCModel[]>(url,{headers});
  }

  updateCC(formdata: CentroCModel[]):Observable<CentroCModel>{
    console.log(formdata)
    const url = `${this.baseurl}/catalogo/updateCC`
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
    });
    return this.http.post<CentroCModel>(url,formdata,{headers});
  }
}

