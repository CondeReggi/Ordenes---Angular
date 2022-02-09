import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent implements OnInit {
  @Input()
  Listado: any;

  constructor() { }

  ngOnInit(): void {
  }

}
