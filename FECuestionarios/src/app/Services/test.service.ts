import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  urlT = 'http://'+sessionStorage.getItem('ip')+'/api/test';
  urlResult = 'http://'+sessionStorage.getItem('ip')+'/api/test';

  public idT:any

  constructor(private http: HttpClient, private http2: HttpClient) { }

  getResultados(){
    let cadena = this.urlResult+'/'+localStorage.getItem('idTest')
    return this.http.get(cadena);
  }

  getIdTest(usuarioNombre:string){

    this.http.get(this.urlT+'/'+usuarioNombre).subscribe(respuesta =>{
      localStorage.setItem('idTest', respuesta+"")
    });
  }
}
