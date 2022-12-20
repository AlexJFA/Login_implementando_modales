import { Component, inject, OnInit, Output, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css'],
})
export class RegistreComponent implements OnInit {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: number;
  usuariosLocales: Object;

  constructor(
    private _matDialog: MatDialog,
    public matDialogRef: MatDialogRef<RegistreComponent>,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {}

  // abre el modal de login, se ajusta al tamaño de la pantalla
  loguear() {
    
    //cierra el modal de resgitre
    this.matDialogRef.close();

    if (screen.width <= 500) {
      this._matDialog.open(LoginComponent, {
        maxWidth: '100vw',
        width: '95%',
        maxHeight: '670px',
      });
    } else {
      this._matDialog.open(LoginComponent, {
        width: '500px',
        maxHeight: '670px',
      });
    }
  }

  registrar() {
    //cierra el modal de registre
    this.matDialogRef.close();

    /*aplicamos el servicio "usuariosService"  al metodo "register()" y le pasamos el email y la clave,
     y esto al devolver una promesa podemos usar el "then" y el" catch"  */

    //llama al metodo "register" del servicio "usuariosService" para  crear el usuario el Firebase.
    this.usuariosService
      .register(this.email, this.contrasena)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert('Ocurrio un error ' + error);
      });
  }

  agg() {
    // crea un nuevo objeto con el nuevo usuario creado usando el metodo "agregar" del servicio "usuariosService",
    // y lo almacena en "usuariosLocales"
    this.usuariosLocales = this.usuariosService.agregar(
      this.nombre,
      this.apellido,
      this.email,
      this.contrasena
    );

    /*  EMITE EL VALOR DE usuariosLocales para que lo puedan escuchar los componentes que lo necesiten*/
    this.usuariosService.disparadorDeUsuario.emit({
      data: this.usuariosLocales,
    });
  }
}
