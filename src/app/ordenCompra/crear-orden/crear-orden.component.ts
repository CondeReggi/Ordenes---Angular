import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstacionesService } from '../estaciones.service';
import { ListEstacion, ListUser } from '../orden-compra';
import { OrdenCompraService } from '../orden-compra.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit {

  listaUsuarios: ListUser[] = [];
  listaEstaciones: ListEstacion[] = [];

  @Output()
  Data: EventEmitter<number> = new EventEmitter<number>();

  form = new FormGroup({
    fechaHora: new FormControl(),
    estacionId: new FormControl(),
    usuarioId: new FormControl(),
    importeTotal: new FormControl(),
    estado: new FormControl(),
  });

  formularioOriginal = {
    fechaHora: ["", { validators: [Validators.required] }],
    estacionId: ["", { validators: [Validators.required] }],
    usuarioId: ["", { validators: [Validators.required] }],
    importeTotal: ["", { validators: [Validators.required] }],
    estado: [true, { validators: [Validators.required] }]
  }

  constructor(private ordenServices: OrdenCompraService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private estacionesServices: EstacionesService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);

    this.usuariosService.obtenerListado().subscribe(listado => {
      this.listaUsuarios = listado;
    }, err => console.log(err))

    this.estacionesServices.obtenerListado().subscribe(listado => {
      this.listaEstaciones = listado;
    }, err => console.log(err))
  }

  buscarOrdenes() {

  }

  CrearOrden() {
    const {fechaHora,  estacionId , usuarioId , importeTotal , estado} = this.form.value;

    var Orden = {
      fechaHora: fechaHora,
      estacionId: estacionId,
      usuarioId: usuarioId,
      importeTotal: parseInt(importeTotal),
      estado: estado
    }

    this.ordenServices.crearOrden( Orden ).subscribe( () => {
      console.log("Se ha creado correctamente")
    }, err => console.log(err))

    this.Data.emit();
  }

}
