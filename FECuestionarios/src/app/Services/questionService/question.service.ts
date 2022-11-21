import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnswerModule} from "../../Modules/answer/answer.module";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  urlQs = sessionStorage.getItem('ip')+'/api/preguntas';
  urlQ = sessionStorage.getItem('ip')+'/api/pregunta';
  urlA = sessionStorage.getItem('ip')+'/api/opciones';
  urlR = sessionStorage.getItem('ip')+'/api/respuestas';

  constructor(private http: HttpClient, private http2: HttpClient) {  }


  getPregunta(){
    let puntuacion = localStorage.getItem('puntuacion') 
    let cantidad = localStorage.getItem('questionNumber');
    let puntuacionPromedio = 0
    if(cantidad == '1' ){
      puntuacionPromedio = Math.round(parseInt(''+puntuacion) / (parseInt(''+cantidad)));
    }else{
      puntuacionPromedio = Math.round(parseInt(''+puntuacion) / (parseInt(''+cantidad)-1));
    }
    let cadena = this.urlQ+'/'+puntuacionPromedio+'/'+localStorage.getItem('dificultad')+'/'+localStorage.getItem('ids');
    console.log(cadena)
    return this.http.get(cadena);
  }

  getPreguntas(){
    return this.http.get(this.urlQs);
  }

  getRespuestas(){
    return this.http.get(this.urlA);
  }

  saveRespuesta(answer:AnswerModule){
    let cadena = this.urlR+'/'+answer.idTest+'/'+answer.idPregunta+'/'+answer.idOpcion+'/'+answer.tiempo;

    this.http2.post(cadena, '').subscribe({next: () =>{
      },
      error:(err:any)=>console.log(err)
    });
  }
}
