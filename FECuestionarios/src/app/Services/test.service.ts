import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  urlT = sessionStorage.getItem('ip')+'/api/test';
  urlResult = sessionStorage.getItem('ip')+'/api/test/resultados';

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
