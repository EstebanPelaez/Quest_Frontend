import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserModule } from 'src/app/Modules/user/user/user.module';
import { TestService } from 'src/app/Services/test.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:UserModule = {documento:'',nombre:'',tipousuario:'',listaTest:''};

  constructor(public router: Router, private userService:UserService, private testService:TestService) {

    localStorage.setItem('questionNumber','1')
  }

  async iniciar(nombre:string){
    this.reiniciarStorage()
    try{
        this.user.nombre=nombre;
        this.user.tipousuario='1';
        this.userService.saveUsuario(this.user)
        setTimeout(() => {
          this.testService.getIdTest(nombre)
          this.router.navigateByUrl('question');
         }, 2000);
        
    }catch(e: any){
      alert("Ingrese su código correctamente")
    }
  }
  reiniciarStorage(){
    localStorage.setItem('puntuacion', '0')
    localStorage.setItem('dificultad', '0')
    localStorage.setItem('ids', '0')
  }
  ngOnInit(): void {
  }

}
