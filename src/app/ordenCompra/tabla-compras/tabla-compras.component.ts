import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { Estacion, Orden, Usuario } from '../orden-compra';
import { OrdenCompraService } from '../orden-compra.service';

@Component({
  selector: 'app-tabla-compras',
  templateUrl: './tabla-compras.component.html',
  styleUrls: ['./tabla-compras.component.css']
})

export class TablaComprasComponent implements OnInit {
  ordenes: Orden[] = [];
  estado: boolean = false;

  columnsToDisplay = ['Id', 'Fecha Hora', 'Estación' , 'Usuario' , 'Celular', 'Cedula', 'Importe Total', 'Estado', 'Medio de Pago'];

  // Sacar de una BD
  menuDesplegable = [
    { icon: 'attach_money' , texto: 'Orden Pago' },
    { icon: 'keyboard_tab' , texto: 'Orden Canje' },
    { icon: 'local_offer' , texto: 'Orden Cupón' },
    { icon: 'loyalty' , texto: 'Orden GLP' },
    { icon: 'card_giftcard' , texto: 'Beneficios' },
    { icon: 'local_car_wash' , texto: 'Agentes GLP' },
    { icon: 'local_gas_station' , texto: 'Estaciones' },
    { icon: 'calendar_today' , texto: 'Feriados' },
    { icon: 'aspect_ratio' , texto: 'Medios de Pago' },
    { icon: 'build' , texto: 'Parámetros' },
    { icon: 'directions_car' , texto: 'Servicios' },
    { icon: 'domain' , texto: 'Empresas de beneficio' },
    { icon: 'pool' , texto: 'Lubricantes' },
    { icon: 'person' , texto: 'Usuarios' }
  ]

  paginaActual = 1;
  cantidadRegistrosAMostrar = 5;
  cantidadTotalRegistros: any;

  constructor(private ordenesServices: OrdenCompraService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  setearData(Data: Orden[]){
    this.ordenes = Data || [];
    this.cantidadTotalRegistros = 50;
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number){
    // this.generosService.obtenerPaginado( pagina, cantidadElementosAMostrar ).subscribe((resp: HttpResponse<generoDTO[]>) => {
    //   this.generos = resp.body;

    //   // console.log(resp.headers.get("cantidadTotalRegistros"));
    //   this.cantidadTotalRegistros = resp.headers.get("cantidadTotalRegistros");
    // }, error => console.error(error));

    //Tengo que hacerme un endpoint con el paginado o implementar el paginado a mi endpoint de filtro
    this.paginaActual = pagina;
    this.cantidadRegistrosAMostrar = cantidadElementosAMostrar;
  }


  datos: Orden[] = [];

  clickeable(contact: Orden){
    const dialogo1 = this.dialog.open(ConfirmDialogComponent, {
      data: contact
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.agregar(art);
    });
  }

  agregar(orden: Orden) {
    //aca llega los datos cambiados
    console.log(orden);

    this.ordenesServices.editarOrden( orden.id , orden ).subscribe( () => {
      console.log("Salio eselente")
    }, err => console.log(err) )
  }
}
