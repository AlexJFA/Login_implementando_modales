import { Injectable, Output, EventEmitter } from '@angular/core';
import { NewUser } from '../models/NewUser';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  //emite datos cuando lo llamemos en los diferentes componentes, como en el logi o registre.
  @Output() disparadorDeUsuario: EventEmitter<any> = new EventEmitter();

  constructor(private auth: Auth) {}

  // permite loguear el Firebase
  login(email: any, password: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //crea el usaurios en Firebase
  register(email: any, password: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // crea un nuevo objeto.
  agregar(nombre: string, apellido: string, email: string, contrasena: number) {
    return new NewUser(nombre, apellido, email, contrasena);
  }

  desloguear() {
    // llamamos al metodo "getAuth" para validar el usuario logueado.
    const auth = getAuth();

    // llamamos al metodo "signOut" para  desloguearl al usuarios  este metodo devuelve una promesa.
    return signOut(auth);
  }
}
