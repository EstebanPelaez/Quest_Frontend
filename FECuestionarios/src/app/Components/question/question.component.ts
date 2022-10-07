import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {QuestionService} from "../../Services/questionService/question.service";
import {map} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  answers:any = [];
  questionList:any = [];

  constructor(private questionService:QuestionService, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.toListQuestion();
    this.toListAnswers();
  }


  toListQuestion(){
    this.questionService.getPreguntas().subscribe({
      next:(result:any) => {
        this.questionList = result;
      },
      error:(err:any)=>console.log(err)
    });
  }

  toListAnswers(){
    this.questionService.getRespuestas().subscribe((result: any) => {
      this.questionList = result;
      localStorage.setItem('questions', result);
    });
    console.log(localStorage.getItem('questions'));
    /*this.questionService.getRespuestas().subscribe({
      next:(result:any) => {
        this.answers = result;
        this.setAnsComp();
      },
      error:(err:any)=>console.log(err)
    })*/
  }

  setAnsComp(){
    let index = parseInt(localStorage.getItem('questionNumber')!);
    this.renderer2.setStyle(document.getElementById('txt-img'), 'display', 'none');
    this.renderer2.setStyle(document.getElementById('txt-answers'), 'display', 'block');
    for (let i = 0; i <this.answers.length; i++) {
      if(this.answers[i].imagen !=null && this.answers[i].pregunta.id==index){
        this.renderer2.setStyle(document.getElementById('txt-img'), 'display', 'block');
        this.renderer2.setStyle(document.getElementById('txt-answers'), 'display', 'none');
        break;
      }
    }
  }
}
