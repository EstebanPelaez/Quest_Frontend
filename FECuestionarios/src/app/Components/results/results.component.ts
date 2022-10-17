import { Component, OnInit} from '@angular/core';
import { TestService} from "../../Services/test.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  question:any;
  questionNumber:string;

  constructor( private testService:TestService, private router:Router) {
    this.questionNumber = localStorage.getItem('questionNumber')!;
  }

  ngOnInit(): void {
    this.toListResults();
  }

  toListResults(){
    this.testService.getResultados().subscribe({
      next:(result:any) => {
        let index = localStorage.getItem('idTest')
        for(let i=0; i< result.length ; i++){
          if(result[i].id == index){
            this.question = result[i];
          }
        }
      },
      error:(err:any) => console.log(err)
    })
  }
}

