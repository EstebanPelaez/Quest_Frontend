import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { QuestionService } from "../../Services/questionService/question.service";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  answers: any = [];
  question: any;
  questionNumber: string;

  constructor(private questionService: QuestionService, private renderer2: Renderer2, private router: Router) {
    this.questionNumber = localStorage.getItem('questionNumber')!;
    if (this.questionNumber == '7') {
      router.navigate(['/results']);
    }
  }

  ngOnInit(): void {
    this.toListQuestion();
    this.toListAnswers();
    this.toSaveData();
  }

  toListQuestion() {
    this.questionService.getPregunta().subscribe({
      next: (result: any) => {
        this.question = result;
        localStorage.setItem('questionN',this.question.id)
        localStorage.setItem('dificultad', this.question.nivelDificultad)
      }
    });
  }

  toListAnswers() {
    this.questionService.getRespuestas().subscribe({
      next: (result: any) => {
        console.log(result)
        let index = localStorage.getItem('questionN');
        for (let i = 0; i < result.length; i++) {
          if (result[i].pregunta.id == index) {
            this.answers.push(result[i]);
            this.setAnsComp();
          }
        }
      },
        error: (err: any) => console.log(err)
      });
  }
  toSaveData(){

  }
  setAnsComp() {
    let index = parseInt(localStorage.getItem('questionN')!);
    this.renderer2.setStyle(document.getElementById('txt-img'), 'display', 'none');
    this.renderer2.setStyle(document.getElementById('txt-answers'), 'display', 'block');
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].imagen != null && this.answers[i].pregunta.id == index) {
        this.renderer2.setStyle(document.getElementById('txt-img'), 'display', 'block');
        this.renderer2.setStyle(document.getElementById('txt-answers'), 'display', 'none');
        break;

      }
    }
  }

  reload() {
    window.location.reload();
  }
}
