import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from '../Modules/user/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlU = 'https://' + sessionStorage.getItem('ip') + '/api/usuario';

  constructor(private http: HttpClient, private http2: HttpClient) { }

  saveUsuario(user: UserModule) {

    let cadena = this.urlU + '/' + user.nombre + '/' +user.tipousuario;
    this.http2.post(cadena, '').subscribe({
      next: () => {
      },
      error: (err: any) => console.log(err)
    });
  }
}
