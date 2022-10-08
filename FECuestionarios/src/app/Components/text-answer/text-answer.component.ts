import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {QuestionComponent} from "../question/question.component";

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css']
})
export class TextAnswerComponent implements OnInit {

  isDisabled: boolean = false;
  fb!: Element;

  @Input()
  questions!: any[];
  @Input()
  answers!: any[];

  @Output()
  messageEvent = new EventEmitter<string>();

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.isDisabled = false;
    this.fb = document.getElementById('feedback')!;
    let elements = document.getElementsByClassName('ans-container');
  }

  verSeleccion(container:Element){
    if(container.className.includes(' true')){
      this.setStyleCA(container);
      this.renderer2.addClass(this.fb, 'right');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fbtxt')!.textContent = '¡Muy bien! tu respuesta es correcta';
    }else{
      this.setStyleWA(container);
      this.setStyleCA(document.getElementsByClassName('true').item(0)!);
      this.renderer2.addClass(this.fb, 'wrong');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fbtxt')!.textContent = '¡Oops! respuesta incorrecta';
    }
    this.isDisabled = true;
    this.renderer2.setStyle(container, 'disabled', 'true');
    setTimeout(()=> this.reload(), 5000);
    setInterval(()=>this.loadBar(), 500);
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
    this.messageEvent.emit('reload');
  }

  loadBar(){
    let bar = document.getElementById('feedback')!;
  }
}
