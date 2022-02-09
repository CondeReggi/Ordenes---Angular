import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estacion, Orden, Usuario } from './orden-compra';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  constructor(private http: HttpClient, private route: Router) { }

  apiUrl: string = environment.cadenaConeccion + "OrdenesDePago";
  apiUrlUsuario: string = environment.cadenaConeccion + "usuarios";
  apiUrlEstaciones: string = environment.cadenaConeccion + "estaciones";
  apiUrlFiltro: string = environment.cadenaConeccion + "OrdenesDePago/filtrado";

  public obtenerTodasLasOrdenes(): Observable<Orden[]>{
    return this.http.get<Orden[]>( this.apiUrl );
  }

  public obtenerUsuarioId( id: number ): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrlUsuario}/${id}`);
  }

  public obtenerEstacionId( id: number ): Observable<Estacion>{
    return this.http.get<Estacion>(`${this.apiUrlEstaciones}/${id}`);
  }

  public filtrarOrdenes( valores: any): Observable<any>{

    console.log(valores)

    const params = new HttpParams({
      fromObject: valores
    })

    console.log(params)

    return this.http.get<Orden[]>(`${this.apiUrlFiltro}` , { params: params , observe: 'response' });
  }

}
