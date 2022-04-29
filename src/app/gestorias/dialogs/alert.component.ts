import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Catalogo, CatGeneric } from '../pages/interfaces/configuracion.interface';
import { ConfiguracionService } from '../pages/services/configuracion.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent  {
  // @Output() public textoEmitido = new EventEmitter<string>();
  // @Output() reloadComponent: EventEmitter<any> = new EventEmitter();

  constructor(
    private configuracion: ConfiguracionService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AlertComponent>
  ) { }

  cat: CatGeneric;
  area: Catalogo[];

  editRequrimineto(requerimiento){
    localStorage.setItem('requerimiento', JSON.stringify(requerimiento));
  }

  consumeArea(){
    this.configuracion.getAreaSolicitante().subscribe(
      resp => {
        this.area = resp;
        localStorage.removeItem('area');
        localStorage.setItem('area', JSON.stringify(this.area));
      }
    );
  }

  crearForm: FormGroup = this.formBuilder.group({
    nombre: ['',[ Validators.required, Validators.maxLength(2)]],
    descripcion: ['', Validators.required]
  })

  generico(type: number, id: number, catid: number){
    console.log(catid)
    this.cat = {
      activo: 1,
      id: id,
      descripcion: this.crearForm.value.nombre,
      comentario: this.crearForm.value.descripcion,
    }
    switch(catid){
      case 1:
        this.configuracion.putEstado(this.cat).subscribe(
          resp =>{
          },error =>{
            Swal.fire(
              'Error',
              'Al editar requerimiento',
              'error'
            )
          }
        );
        break;
      case 2:
        if(type==1){
          this.configuracion.setUnidadMedida(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Unidad Medida',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putUnidadMedida(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al editar Unidad Medida',
                'error'
              )
            }
          );
        }
        break;
      case 3:
        if(type==1){
          this.configuracion.setAreaSolicitante(this.cat).subscribe(
            resp =>{
              this.consumeArea();
              this.configuracion.disparadorActualizar.emit();
              console.log("area");
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Aera Solictante',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putAreaSolicitante(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al editar Aera Solictante',
                'error'
              )
            }
          );
        }
        break;
      case 4:
        if(type==1){
          this.configuracion.setTipoPermiso(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoPermiso(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 5:
        if(type==1){
          this.configuracion.setTipoPermiso(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoPermiso(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 6:
        if(type==1){
          console.log(this.cat)
          this.configuracion.setTipoSolicitud(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoSolicitud(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 7:
        if(type==1){
          console.log(this.cat)
          this.configuracion.setTipoCobertura(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoCobertura(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
      case 8:
        if(type==1){
          console.log(this.cat)
          this.configuracion.setTipoActividad(this.cat).subscribe(
            resp =>{
              this.configuracion.disparadorActualizar.emit();
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }else{
          this.configuracion.putTipoActividad(this.cat).subscribe(
            resp =>{
            },error =>{
              Swal.fire(
                'Error',
                'Al crear Tipo Permiso',
                'error'
              )
            }
          );
        }
        break;
    }

  }

}
