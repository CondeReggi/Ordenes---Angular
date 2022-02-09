import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    { icon: 'person' , texto: 'Usuarios' },
  ]

  paginaActual = 1;
  cantidadRegistrosAMostrar = 5;

  constructor(private ordenesServices: OrdenCompraService) { }

  ngOnInit(): void {
    this.ordenesServices.obtenerTodasLasOrdenes().subscribe( ordenes => {
      this.ordenes = ordenes;
    }, err => console.log(err))
  }

  setearData(Data: Orden[]){
    console.log("hola")
    this.ordenes = Data || [];
  }

}
