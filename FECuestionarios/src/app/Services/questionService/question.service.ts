import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnswerModule} from "../../Modules/answer/answer.module";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  urlQ = 'https://'+sessionStorage.getItem('ip')+'/api/preguntas';
  urlA = 'https://'+sessionStorage.getItem('ip')+'/api/opciones';
  urlR = 'https://'+sessionStorage.getItem('ip')+'/api/respuestas';

  constructor(private http: HttpClient, private http2: HttpClient) {  }

  getPreguntas(){
    return this.http.get(this.urlQ);
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
