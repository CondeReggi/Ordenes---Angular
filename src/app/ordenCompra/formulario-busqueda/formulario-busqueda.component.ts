import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  // cantidadElementos;

  @Output()
  Data: EventEmitter<Orden[]> = new EventEmitter<Orden[]>();

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

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formOriginal)

    this.buscarPeliculas({});

    this.form.valueChanges.subscribe( valores => {
      this.escribirParametrosBusqueda();

      var valoresObj = {
        Id: valores.id || 0,
        EstacionId: valores.estacion || 0,
        UsuarioId: valores.usuario || 0,
        ImporteTotal: valores.importeTotal || 0,
        estado: valores.estado ? true : false,
        FechaHora: valores.fechaHora ? new Date(valores.fechaHora).toDateString() : ''
      }

      this.buscarPeliculas(valoresObj);
    })
  }

  guardarCambios(){
    // console.log(this.form.value);
    this.escribirParametrosBusqueda();
    this.buscarPeliculas({});
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

      // console.log(format)

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

  buscarPeliculas(valores: any){
    valores.pagina = this.paginaActual;
    valores.RecordsPorPagina = this.cantidadElementosAMostrar;

    // console.log(valores)

    this.ordenesServices.filtrarOrdenes(valores).subscribe(ordenes => {

      // this.peliculas = peliculas.body;
      this.escribirParametrosBusqueda();
      this.Data.emit( ordenes.body );

      // console.log("Emitiendo" , ordenes.body)

    }, err => console.log(err))
  }

  LimpiarForm(){
    this.form.patchValue(this.formOriginal)
  }
}
