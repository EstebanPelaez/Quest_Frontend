import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './Components/question/question.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { ResultsComponent } from './Components/results/results.component';
import { HomeComponent } from './Components/home/home.component';
import { TextAnswerComponent } from './Components/text-answer/text-answer.component';
import { ImgAnswerComponent } from './Components/img-answer/img-answer.component';
import { SummaryComponent } from './Components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    NotificationComponent,
    ResultsComponent,
    HomeComponent,
    TextAnswerComponent,
    ImgAnswerComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
