import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrearService } from '../gestorias/pages/services/crear.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationGuard implements CanActivate {

  constructor(
    private auth: CrearService,
    private router: Router
  ){}

  canActivate(): boolean {
    if(this.auth.getToken()){
      return true;
    }else{
      this.router.navigateByUrl('/');
    }
  }
}
