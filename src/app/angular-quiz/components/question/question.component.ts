import { Component, inject } from "@angular/core";
import { AnswerComponent } from "../answer/answer.component";
import { QuizService } from "../../services/quiz.service";
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from "@angular/material/card";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

@Component({
    selector: "angular-quiz-question",
    templateUrl: "./question.component.html",
    styleUrl: "./question.component.css",
    standalone: true,
    imports: [
        AnswerComponent,
        MatCardContent,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatGridList,
        MatGridTile,
    ],
})
export class QuestionComponent {
    public readonly quizService: QuizService = inject(QuizService);
}
