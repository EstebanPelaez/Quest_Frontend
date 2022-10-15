import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { 

    localStorage.setItem('questionNumber','1')
  }

  async iniciar(nombre:string){
    try{
        //falta la linea para mandar el nombre 
        await this.router.navigateByUrl('question');
    }catch(e: any){
      alert("Ingrese su código correctamente")
    }
  }

  ngOnInit(): void {
  }

}
