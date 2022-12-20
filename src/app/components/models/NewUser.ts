export class NewUser {
  public nombre: string;
  public apellido: string;
  public email: string;
  public contrasena: number;
  constructor(name: string, lastName: string, ema: string, contra: number) {
    (this.nombre = name),
      (this.apellido = lastName),
      (this.email = ema),
      (this.contrasena = contra);
  }
}
