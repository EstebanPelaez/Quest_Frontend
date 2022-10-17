import { Component, OnInit} from '@angular/core';
import { TestService} from "../../Services/test.service";
import {Router} from "@angular/router";
import {ResultModule} from "../../Modules/results/results.module";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  question:any;
  questionNumber:string;
  preguntas:any = [];
  respuestas:any = [];

  public resultados:Array<any> = [

  ]

  constructor( private testService:TestService, private router:Router) {
    this.questionNumber = localStorage.getItem('questionNumber')!;
  }

  ngOnInit(): void {
    this.toListQuestions();
  }

  toListQuestions(){
    this.testService.getResultados().subscribe({
      next:(result:any) => {
        this.preguntas = result;
      }
    })
  }

  toListAnswers(){

  }


  async volver(){
    try{
      await this.router.navigateByUrl('home');
    }catch(e: any){
      alert("Ocurrió un error")
    }
  }
}
