import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from './components/services/usuarios.service';
import { FirebaseApp } from '@angular/fire/app/firebase';
import { object } from 'rxfire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'LOGIN EN ANGULAR USANDO MODALES.';
  public datos: any;
  public valid: any;

  public user: Array<any> = [
    /* asi es la estructura del objeto que llega por el servicio  "usuarioService" en el "ngOnInit()".
    Este Array es recorrido por un ngFor en la template*/
    {
      data: {
        nombre: 'Alexander',
        apellido: 'Figueredo',
        email: 'alex@gmail.com',
      },
    },
    {
      data: {
        nombre: 'Marelvis',
        apellido: 'Figueredo',
        email: 'mare@gmail.com',
      },
    },
    {
      data: {
        nombre: 'Katherin',
        apellido: 'Valero',
        email: 'kathe@gmail.com',
      },
    },
  ];

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.usuarioService.disparadorDeUsuario.subscribe((data) => {
      // me subscribo al servicio (usuarioService) escuchando al (disparadorDeUsuario)
      // el cual devuelve informacion ya sea un Objeto o un string  a traves de "data".

      // recibe lo que viene de data para luego poder comparar el tipo de dato que a llegado
      this.valid = data.data;

      if (typeof this.valid == 'string') {
        /* "datos" toma el valor  "valid" seimpre y cuando este sea un "string" con el email el cual viene del componente login, 
        para mostrarlo en la navbar */
        this.datos = this.valid;
      } else {
        /* en caso de que lo que llegue por el servicio y data sea de tipo Object haremos un unshif al nuestro array de usuarios locales */
        this.user.unshift(data);
      }
    });
  }

  // abre el modal de login, se ajusta al tamaño de la pantalla
  openDialog() {
    if (screen.width <= 500) {
      this.dialog.open(LoginComponent, {
        maxWidth: '100vw',
        width: '95%',
        maxHeight: '670px',
      });
    } else {
      this.dialog.open(LoginComponent, {
        width: '500px',
        maxHeight: '670px',
      });
    }
  }

  logout() {
    // llamamos al metodo "desloguear" para  desloguear al usuarios  este metodo se encuentra en el servicio "usuarioService" y devuelve una promesa.
    this.usuarioService
      .desloguear()
      .then((resolve) => {
        console.log('soy el resolve de deslogueo', resolve);
        // cuando la variable "datos" toma el valor de "resolve" el cual es "undefined",  desaparece el nombre de la navbar.
        this.datos = resolve;
      })
      .catch((error) => {
        console.log('soy el error de deslogueo', error);
      });
  }
}
