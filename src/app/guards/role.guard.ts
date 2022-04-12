import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router
  ){}

  canActivate(): boolean {
    let token = JSON.parse(sessionStorage.getItem('token'))
    let tk = JSON.parse(atob(token.split('.')[1]));
    let role = tk.roles[0];
    if(role == 'ROLE_CONFIGURACION'){
      return true;
    }else{
      this.router.navigateByUrl('/gestorias/requerimientos');
    }
  }

}
