export interface ordenCompraDTO {
  id: number;
  fechaHora: Date;
  estacionId: number;
  usuarioId: number;
  importeTotal: number;
  estado: boolean;
}

export interface ordenCompraCrear {
  fechaHora: Date;
  estacionId: number;
  usuarioId: number;
  importeTotal: number;
  estado: boolean;
}

export interface Usuario {
  id: number;
  email: string;
  cedula: number;
  targeta: string;
}

export interface Estacion {
  id: number;
  nombre: string;
  mail: string;
}

export interface Orden {
  id: number;
  fechaHora: Date;
  importeTotal: number;
  estado: boolean;
  usuario: Usuario;
  estacion: Estacion;
}

export interface ListUser {
  id: number;
  name: string;
}

export interface ListEstacion {
  id: number;
  name: string;
}

