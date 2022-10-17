import {AnswerModule} from "../answer/answer.module";
import {QuestionModule} from "../question/question.module";

export interface ResultModule{

  opcionCorrecta:AnswerModule;
  opcionMarcada:AnswerModule;
  pregunta:QuestionModule;
}
