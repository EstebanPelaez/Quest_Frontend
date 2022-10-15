import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  async iniciar(codigo:string){
    console.log("uwu"+codigo)
    try{
        await this.router.navigateByUrl('question');
    }catch(e: any){
      alert("Ingrese su código correctamente")
    }
  }

  ngOnInit(): void {
  }

}
