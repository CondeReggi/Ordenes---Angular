import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landingPage/landing-page/landing-page.component';
import { MenuComponent } from './menu/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TablaComprasComponent } from './ordenCompra/tabla-compras/tabla-compras.component';
import { HttpClientModule } from '@angular/common/http';
import { ListadoGenericoComponent } from './utilidades/listado-generico/listado-generico/listado-generico.component';
import { FormularioBusquedaComponent } from './ordenCompra/formulario-busqueda/formulario-busqueda.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MenuComponent,
    TablaComprasComponent,
    ListadoGenericoComponent,
    FormularioBusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
