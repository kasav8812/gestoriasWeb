import { Component, OnInit } from '@angular/core';
import { Catalogo, CentroCModel } from '../../interfaces/configuracion.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/gestorias/dialogs/alert.component';
import { ConfiguracionService } from '../../services/configuracion.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { timingSafeEqual } from 'crypto';
import { CrearService } from '../../services/crear.service';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styles: [
  ]
})

export class ccComponent implements OnInit {
   

    mCatCC : CentroCModel[] = [];
    selectedFiles: FileList[] = [];
    progressInfo = [];
    message = '';
    imageName = "";
    fileInfos: Observable<any>;
    jsonCrear:any;

    constructor(private configuracion: ConfiguracionService,
      public dialog: MatDialog,private creaService: CrearService) { }

    ngOnInit(): void {
      this.creaService.getAllCC().subscribe(
        response => {
          this.mCatCC = response;
        },
        error => {
        }
      ) 
    }


    selectFiles(event) {
      console.log(event.target.value);
      this.progressInfo = [];
      event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
      for (var i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(event.target.files[i])
      }
    }

    onFileChange(event: any) {
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  
        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        /* save data */
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        console.log(data); // Data will be logged in array format containing objects
        for (let item of data) {
           
          this.mCatCC.push(item as CentroCModel);
        }  
        console.log("Centro de Costos Cast"); // Data will be logged in array format containing objects

        console.log(this.mCatCC); // Data will be logged in array format containing objects
        this.creaService.setCC(this.mCatCC).subscribe(
          response => {
            this.mCatCC = response;
            this.ngOnInit();
          },
          error => {
          }
        ) 
      };
   }

   enableCC(item){
    if(item.enabled == true){
      Swal.fire({
        title: '¿Esta seguro que desea desactivar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.changeValue(item,false);
          Swal.fire(
            'Desactivada',
            'Se desactivo correctamente',
            'success'
          )
        }
      })
    }else {
      Swal.fire({
        title: '¿Esta seguro que desea activar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.changeValue(item,true);
          Swal.fire(
            'Activada',
            'Se activo correctamente',
            'success'
          )
        }
      })
    }
    this.ngOnInit();
   }

   changeValue(mData: CentroCModel, mEnabled : boolean){
    this.jsonCrear = {
      id: mData.id,
      cc: mData.cc,
      nombreCC: mData.nombreCC,
      responsableCC: mData.responsableCC,
      enabled : mEnabled
    }
  
    this.creaService.updateCC(this.jsonCrear).subscribe(
      response => {
        this.ngOnInit();
        console.log("Success update usr")
      },
      error => {
        console.log("Error Update usr")
      }
    )
  }
  
}
