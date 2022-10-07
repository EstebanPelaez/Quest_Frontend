import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FECuestionarios';

  constructor() {
    localStorage.setItem('ip', 'localhost:8080');
    localStorage.setItem('questionNumber', '0');
  }
}
