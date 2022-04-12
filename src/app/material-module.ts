import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSliderModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'}
  ]
})
export class MaterialModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "ico-hamburguesa",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/header/btn_hamburguer.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-check",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/check.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-ojo-off",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/eye-off-outline.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-ojo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/eye-outline.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-mas",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/plus-circle-outline.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-flecha-derecha",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/right-arrow.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-salir",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/salir.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-alerta",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/alert-circle-outline.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-alerta-check",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/alert-circle-outline-check.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-salio",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/tracking/salio.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-en-camino",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/tracking/en-camino.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-llegando",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/tracking/llegando.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-mercancia-recibida",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/tracking/mercancia-recibida.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-direccion",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/direccion.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-datos-usuario",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/datos-usuario.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-correo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/correo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-lock",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/lock.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "ico-hoja",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/hoja.svg")
    );
  }
}
