import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FECuestionarios';

  constructor() {
    sessionStorage.setItem('ip', 'localhost:8080');
    sessionStorage.setItem('questionNumber', '1')
    console.log(sessionStorage.getItem('questionNumber'));
  }
}
