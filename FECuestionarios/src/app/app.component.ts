import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FECuestionarios';

  constructor() {
    sessionStorage.setItem('ip', 'backcuestionarios.herokuapp.com')
    sessionStorage.setItem('questionNumber', '1')
  }
}
