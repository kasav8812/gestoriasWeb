import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NabvarComponent } from './nabvar.component';
import { MaterialModule } from 'src/app/material-module';
import { AuthModule } from 'src/app/auth/auth.module';



@NgModule({
  declarations: [NabvarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthModule
  ],
  exports:[NabvarComponent]
})
export class SharedModule { }
