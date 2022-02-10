import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orden } from 'src/app/ordenCompra/orden-compra';
import { OrdenCompraService } from 'src/app/ordenCompra/orden-compra.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Orden, private ordenServices: OrdenCompraService) { }

  ngOnInit() {
    console.log(this.data);
  }

  cancelar() {
    this.dialogRef.close();
  }

  borrar(event: any) {
    let confirmacion = confirm(`¿Estas seguro que deseas borrar la orden ${ event.id }?`);

    if ( confirmacion ) {
      this.ordenServices.borrarOrden( event.id ).subscribe( () => {
        //Actualizar datos en tabla
        console.log("Se ha borrado exitosamente");
        this.dialogRef.close();
        window.location.reload();
      }, err => console.log(err))
    }
  }

}
