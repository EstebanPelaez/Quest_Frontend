import {Component, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css']
})
export class TextAnswerComponent implements OnInit {

  isDisabled: boolean = false;
  fb: Element | undefined;

  @Input() questions!: string[];
  @Input() answers!: string[];
  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.isDisabled = false;
    this.fb = document.getElementById('feedback')!;
    let elements = document.getElementsByClassName('ans-container');
    for (let i = 0; i < elements.length; i++) {
      if(elements.item(i)!.id!='ansA'){
        this.renderer2.addClass(elements.item(i), 'incorrect')
      }else{
        this.renderer2.addClass(elements.item(i), 'correct')
      }
    }
  }
  ngAfterViewInit(){
    console.log(this.questions);
  }

  verSeleccion(container:Element){
    //window.location.reload();
    if(container.className.includes(' correct')){
      this.setStyleCA(container);
      this.renderer2.addClass(this.fb, 'right');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fbtxt')!.textContent = '¡Muy bien! tu respuesta es correcta';
    }else{
      this.setStyleWA(container);
      this.setStyleCA(document.getElementsByClassName('correct').item(0)!);
      this.renderer2.addClass(this.fb, 'wrong');
      this.renderer2.setStyle(this.fb, 'display', 'block');
      document.getElementById('fbtxt')!.textContent = '¡Oops! respuesta incorrecta';
    }
    this.isDisabled = true;
    this.renderer2.setStyle(container, 'disabled', 'true');
    setTimeout(()=> window.location.reload(), 5000);
    setInterval(()=>this.loadBar(), 500);
  }

  setStyleCA(container:Element){
    this.renderer2.setStyle(container, 'border-color', '#c7f9cc');
    this.renderer2.setStyle(container.firstChild, 'background-color', '#c7f9cc');
    this.renderer2.setStyle(container.lastChild, 'background-color', 'var(--right)');
    this.renderer2.setStyle(container, 'bottom', '8px');
  }

  setStyleWA(container: Element){
    console.log(container);
    this.renderer2.setStyle(container, 'border-color', '#ff758f');
    this.renderer2.setStyle(container.firstChild, 'background-color', '#ff758f');
    this.renderer2.setStyle(container.lastChild, 'background-color', 'var(--wrong)');
    this.renderer2.setStyle(container, 'bottom', '8px');
  }

  setQuestion(){

  }

  reload(){
    window.location.reload();
  }

  loadBar(){
    let bar = document.getElementById('feedback')!;
  }
}
