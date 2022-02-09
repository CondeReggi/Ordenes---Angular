import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landingPage/landing-page/landing-page.component';
import { OrdenCompraService } from './ordenCompra/orden-compra.service';
import { TablaComprasComponent } from './ordenCompra/tabla-compras/tabla-compras.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "ordenes",
    component: TablaComprasComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
