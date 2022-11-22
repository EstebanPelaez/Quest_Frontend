import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {QuestionComponent} from "../question/question.component";
import {AnswerModule} from "../../Modules/answer/answer.module";
import {QuestionService} from "../../Services/questionService/question.service";

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css']
})
export class TextAnswerComponent implements OnInit {

  isDisabled: boolean = false;
  fb!: Element;
  respuesta:AnswerModule = {idOpcion:'', idTest:'', idPregunta:'', tiempo:''};

  start:any;
  end:any;

  isCorrecta:boolean = false;

  @Input()
  questions!: any[];
  @Input()
  answers!: any[];

  @Output()
  messageEvent = new EventEmitter<string>();

  constructor(private renderer2: Renderer2, private questionService:QuestionService) {
  }

  ngOnInit(): void {
    this.isDisabled = false;
    this.fb = document.getElementById('feedback')!;
    this.start = window.performance.now();
  }

  verSeleccion(container:Element){
    this.renderer2.setStyle(document.getElementById("mainq-container"), "filter", "brightness(0.5)");
    if(container.className.includes(' true')){
      this.isCorrecta = true;
      this.setStyleCA(container);
      this.renderer2.addClass(this.fb, 'right');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fb-title')!.textContent = '¡Muy bien!';
      document.getElementById('fb-txt')!.textContent = 'Tu respuesta es correcta, sigue así!';
    }else{
      this.isCorrecta = false;
      this.setStyleWA(container);
      this.setStyleCA(document.getElementsByClassName('true').item(0)!);
      this.renderer2.addClass(this.fb, 'wrong');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fb-title')!.textContent = '¡Oops!';
      document.getElementById('fb-txt')!.textContent = 'Tu respuesta es incorrecta, debes esforzarte un poco más!';
    }
    this.isDisabled = true;
    this.renderer2.setStyle(container, 'disabled', 'true');
    this.saveAnswer(container);
    let dificultad = ''+localStorage.getItem('dificultad')

    switch (dificultad) {
      case '0' : this.saveDifficulty0();
                break;
      case '1' : this.saveDifficulty1();
                break;
      case '2' : this.saveDifficulty2();
                break;
      case '3' : this.saveDifficulty3();
                break;
    }
    let cadena = localStorage.getItem('ids') + '@' + localStorage.getItem('questionN')
    localStorage.setItem('ids',cadena)
    setTimeout(()=> this.reload(), 5000);
  }

  setStyleCA(container:Element){
    this.renderer2.setStyle(container, 'border-color', '#c7f9cc');
    this.renderer2.setStyle(container.firstChild, 'background-color', '#c7f9cc');
    this.renderer2.setStyle(container.lastChild, 'background-color', 'var(--right)');
    this.renderer2.setStyle(container, 'bottom', '8px');
  }

  setStyleWA(container: Element){
    this.renderer2.setStyle(container, 'border-color', '#ff758f');
    this.renderer2.setStyle(container.firstChild, 'background-color', '#ff758f');
    this.renderer2.setStyle(container.lastChild, 'background-color', 'var(--wrong)');
    this.renderer2.setStyle(container, 'bottom', '8px');
  }

  reload(){
    let index = parseInt(localStorage.getItem('questionNumber')!)+1;
    localStorage.setItem('questionNumber', ''+index);
    this.messageEvent.emit('reload');
  }

  saveAnswer(container:Element){
    this.end = window.performance.now();
    let time = Math.round((this.end-this.start)/1000);
    let id = parseInt(localStorage.getItem('idTest')!);
    this.respuesta.idTest = id+'';
    this.respuesta.idOpcion = container.id;
    this.respuesta.idPregunta = document.getElementsByClassName('q-text')[0].id;
    this.respuesta.tiempo = time+'';
    this.questionService.saveRespuesta(this.respuesta);
  }
  saveDifficulty0(){
    let opcion = this.respuesta.idOpcion

    switch(opcion){
      case '41': localStorage.setItem('puntuacion', '150')
                 localStorage.setItem('dificultad', '2')
                break;
      case '42': localStorage.setItem('puntuacion', '100')
                 localStorage.setItem('dificultad', '1')
                break;
      case '43': localStorage.setItem('puntuacion', '200')
                 localStorage.setItem('dificultad', '3')
                break;
      case '44': localStorage.setItem('puntuacion', '100')
                 localStorage.setItem('dificultad', '1')
                break;
    }

  }
  saveDifficulty1(){
    let tiempo = this.respuesta.tiempo
    let puntuacion = localStorage.getItem('puntuacion')
    if(tiempo > "35" && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 50;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
    if((tiempo < "35" && tiempo > "20") && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 100;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
    if(tiempo <= "20" && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 150;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
  }
  saveDifficulty2(){
    let tiempo = this.respuesta.tiempo
    let puntuacion = localStorage.getItem('puntuacion')

    if(tiempo > "35" && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 100;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
    if((tiempo < "35" && tiempo > "20") && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 150;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
    if(tiempo <= "20" && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 200;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
  }
  saveDifficulty3(){
    let tiempo = this.respuesta.tiempo
    let puntuacion = localStorage.getItem('puntuacion')

    if(tiempo > "35" && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 150;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
    if((tiempo < "35" && tiempo > "20") && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 200;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
    if(tiempo <= "20" && this.isCorrecta){
      let puntuacionN = parseInt(''+puntuacion) + 250;
      localStorage.setItem('puntuacion', ''+puntuacionN)
    }
  }
}
