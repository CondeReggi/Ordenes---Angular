import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListEstacion } from './orden-compra';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  apiUrl = environment.cadenaConeccion + "estaciones";

  constructor(private http: HttpClient) { }

  public obtenerListado(): Observable<ListEstacion[]>{
    return this.http.get<ListEstacion[]>(`${this.apiUrl}/listaEstaciones`);
  }

}
