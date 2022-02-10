import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OrdenCompraService } from '../orden-compra.service';
import { Orden } from '../orden-compra';

@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.css']
})
export class FormularioBusquedaComponent implements OnInit {

  // paginaActual = 1;
  // cantidadElementosAMostrar = 5;
  // cantidadElementos;

  @Input()
  paginaActual: number = 1;

  @Input()
  cantidadElementosAMostrar: number = 5;

  @Output()
  Data: EventEmitter<Orden[]> = new EventEmitter<Orden[]>();
  @Output()
  CantidadDeRegistros: EventEmitter<number> = new EventEmitter<number>();;

  constructor(private formBuilder: FormBuilder, private location: Location, private ordenesServices: OrdenCompraService) { }

  form = new FormGroup({
    id: new FormControl(),
    fechaHora: new FormControl(),
    estacion: new FormControl(),
    usuario: new FormControl(),
    metodo: new FormControl(),
    importeTotal: new FormControl(),
    estado: new FormControl(),
  });

  formOriginal = {
    id: '',
    fechaHora: '',
    estacion: '',
    usuario: '',
    metodo: '',
    importeTotal: '',
    estado: ''
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buscarOrdenes({});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formOriginal)

    this.buscarOrdenes({});

    this.form.valueChanges.subscribe( valores => {
      this.escribirParametrosBusqueda();

      const valoresObj = {
        Id: valores.id || 0,
        EstacionId: valores.estacion || 0,
        UsuarioId: valores.usuario || 0,
        ImporteTotal: valores.importeTotal || 0,
        estado: valores.estado ? true : false,
        FechaHora: valores.fechaHora ? new Date(valores.fechaHora).toDateString() : ''
      }

      this.buscarOrdenes(valoresObj);
    })
  }

  private escribirParametrosBusqueda(){
    var queryStrings = []; //Me voy a creear los querys
    var valoresFormulario = this.form.value; //Tomo los valores del form

    if (valoresFormulario.id){
      queryStrings.push(`Id=${valoresFormulario.id}`)
    }

    if (valoresFormulario.fechaHora){
      const date = new Date(valoresFormulario.fechaHora).toLocaleString()
      const format = date.split(" ");
      queryStrings.push(`FechaHora=${format[0]}`)
    }

    if (valoresFormulario.estacion){
      queryStrings.push(`EstacionId=${valoresFormulario.estacion}`)
    }

    if (valoresFormulario.usuario){
      queryStrings.push(`UsuarioId=${valoresFormulario.usuario}`)
    }

    if (valoresFormulario.importeTotal){
      queryStrings.push(`ImporteTotal=${valoresFormulario.importeTotal}`)
    }

    if (valoresFormulario.estado){
      queryStrings.push(`estado=${valoresFormulario.estado}`)
    }

    this.location.replaceState('ordenes' , queryStrings.join("&"));
  }

  buscarOrdenes(valores: any){
    valores.pagina = this.paginaActual;
    valores.RecordsPorPagina = this.cantidadElementosAMostrar;
    valores.cantidadTotalRegistros = this.CantidadDeRegistros;

    const valoresObj = {
      Id: this.form.value.id || 0,
      EstacionId: this.form.value.estacion || 0,
      UsuarioId: this.form.value.usuario || 0,
      ImporteTotal: this.form.value.importeTotal || 0,
      estado: this.form.value.estado ? true : false,
      FechaHora: this.form.value.fechaHora ? new Date(valores.fechaHora).toDateString() : ''
    }

    valores = {
      ...valores,
      ...valoresObj
    }

    this.ordenesServices.filtrarOrdenes(valores).subscribe(ordenes => {
      this.escribirParametrosBusqueda();
      this.Data.emit( ordenes.body );

      this.CantidadDeRegistros.emit( ordenes.headers.get("cantidadTotalRegistros") );

      // console.log( ordenes.headers.get("cantidadTotalRegistros") );
      // console.log(  )
      // this.cantidadDeRegistros = ordenes.headers.append("cantidadTotalRegistros");
      // this.CantidadDeRegistros.emit( 10 );

    }, err => console.log(err))

  }

  LimpiarForm(){
    this.form.patchValue(this.formOriginal)
  }
}
