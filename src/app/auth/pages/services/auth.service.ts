import { AuthResponse } from '../interfaces/auth.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl: string = environment.urlAuth;


  constructor(private http: HttpClient){ }

  login(user: string , password: string){
    const url = `${this.baseurl}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic '+ btoa(user+ ':' + password))
 
    return this.http.post<AuthResponse>(url,'', {headers});
  }
}
