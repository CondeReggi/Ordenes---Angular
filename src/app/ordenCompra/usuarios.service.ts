import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListUser } from './orden-compra';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUrl = environment.cadenaConeccion + "usuarios";

  constructor(private http: HttpClient) { }

  public obtenerListado(): Observable<ListUser[]>{
    return this.http.get<ListUser[]>(`${this.apiUrl}/listaUsuarios`);
  }

}
