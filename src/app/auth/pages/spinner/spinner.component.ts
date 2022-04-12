import { SpinnerService } from './../services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: [
  ]
})
export class SpinnerComponent implements OnInit {

  isLoading = this.spinner.isLoading;

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
  }

}
