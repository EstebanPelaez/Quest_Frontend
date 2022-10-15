import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserModule } from 'src/app/Modules/user/user/user.module';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:UserModule = {documento:'',nombre:'',tipousuario:'',listaTest:''};

  constructor(public router: Router, private userService:UserService) { 

    localStorage.setItem('questionNumber','1')
  }

  async iniciar(nombre:string){
    try{
        this.user.nombre=nombre;
        this.userService.saveUsuario(this.user)
        //localStorage.setItem('',)
        await this.router.navigateByUrl('question');
    }catch(e: any){
      alert("Ingrese su código correctamente")
    }
  }

  ngOnInit(): void {
  }

}
