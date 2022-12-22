import { Component, OnInit, Output } from '@angular/core';
import { RegistreComponent } from '../registre/registre.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public nombre: string;
  public email: string;
  public contrasena: number;

  constructor(
    public matDialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private usuariosService: UsuariosService
  ) {}
  
  ngOnInit(): void {}

  loguear() {
    //cierra el modal de login
    this.matDialogRef.close();

    //llama al metodo "login" del servicio "usuariosService" para iniciar sesion en Firebase.
    this.usuariosService
      .login(this.email, this.contrasena)
      .then((response) => {
        // Emite el email de inicio de sesion, a traves del servicio y el disparador de usuarios.
        this.usuariosService.disparadorDeUsuario.emit({ data: this.email });
        
      })
      .catch((error) => {
        console.log('soy el error', error);
        alert("Ocurrio un error en el inicio de sesion, intente de nuevo");
      });
  }

  // abre el modal de registre, se ajusta al tamaño de la pantalla
  openDialog() {

    //cierra el modal de login
    this.matDialogRef.close();

    if (screen.width <= 500) {
      this.dialog.open(RegistreComponent, {
        maxWidth: '100vw',
        width: '95%',
        maxHeight: '670px',
      });
    } else {
      this.dialog.open(RegistreComponent, {
        width: '500px',
        maxHeight: '670px',
      });
    }
    
  }

}
