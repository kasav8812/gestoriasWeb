import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
      .nav-tabs {
        border-bottom: none;
      }
      .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
        border: none;
        border-bottom: 4px solid #7A4CF6;
      }
    `
  ]
})
export class MainComponent implements OnInit {

  constructor() { }


  

  ngOnInit(): void {
    localStorage.clear();
  }
  
 
  
}
