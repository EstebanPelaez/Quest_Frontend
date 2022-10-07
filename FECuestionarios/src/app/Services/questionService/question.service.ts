import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  urlQ = 'http://'+localStorage.getItem('ip')+'/api/preguntas';
  urlA = 'http://'+localStorage.getItem('ip')+'/api/opciones';
  questions:any;
  answers:any;

  constructor(private http: HttpClient) { }

  getPreguntas(){
    return this.http.get(this.urlQ);
  }

  getRespuestas(){
    this.answers = this.http.get(this.urlA);
    return this.answers;
  }
}