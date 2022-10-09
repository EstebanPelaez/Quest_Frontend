import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {AnswerModule} from "../../Modules/answer/answer.module";
import {QuestionService} from "../../Services/questionService/question.service";

@Component({
  selector: 'app-img-answer',
  templateUrl: './img-answer.component.html',
  styleUrls: ['./img-answer.component.css']
})
export class ImgAnswerComponent implements OnInit {

  isDisabled: boolean = false;
  fb!: Element;

  @Input()
  questions!: any[];
  @Input()
  answers!: any[];

  @Output()
  messageEvent = new EventEmitter<string>();

  respuesta:AnswerModule = {idOpcion:'', idTest:'', idPregunta:'', tiempo:''};

  start:any;
  end:any;

  constructor(private renderer2: Renderer2, private questionService:QuestionService) { }

  ngOnInit(): void {
    this.isDisabled = false;
    this.fb = document.getElementById('feedback')!;
    this.start = window.performance.now();
  }

  verSeleccion(container:Element){
    if(container.className.includes(' true')){
      this.setStyleCA(container);
      this.renderer2.addClass(this.fb, 'right');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fbtxt')!.textContent = '¡Muy bien! tu respuesta es correcta';
    }else{
      this.setStyleWA(container);
      console.log(document.getElementsByClassName('imgtrue').item(0));
      this.setStyleCA(document.getElementsByClassName('imgtrue').item(0)!);
      this.renderer2.addClass(this.fb, 'wrong');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fbtxt')!.textContent = '¡Oops! respuesta incorrecta';
    }
    this.isDisabled = true;
    this.renderer2.setStyle(container, 'disabled', 'true');
    this.saveAnswer(container);
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
    let index = parseInt(sessionStorage.getItem('questionNumber')!)+1;
    sessionStorage.setItem('questionNumber', ''+index);
    //this.messageEvent.emit('reload');
  }

  saveAnswer(container:Element){
    this.end = window.performance.now();
    let time = Math.round((this.end-this.start)/1000);
    this.respuesta.idTest = '1';
    this.respuesta.idOpcion = container.id;
    this.respuesta.idPregunta = document.getElementsByClassName('q-text')[0].id;
    this.respuesta.tiempo = time+'';
    this.questionService.saveRespuesta(this.respuesta);
  }

}
