import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent  {

  time: any;

  constructor(private router: Router) {
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      sessionStorage.removeItem('token');
      localStorage.clear();
      this.router.navigateByUrl('/');
    },3600000)
   }

}
