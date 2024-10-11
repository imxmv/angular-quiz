import { Component, OnInit, inject } from "@angular/core";
import { QuestionComponent } from "./components/question/question.component";
import { QuizService } from "./services/quiz.service";
import { QuestionInterface } from "./types/question.interface";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from "@angular/material/card";

@Component({
    selector: "angular-quiz",
    templateUrl: "./angular-quiz.component.html",
    styleUrl: "./angular-quiz.component.css",
    standalone: true,
    imports: [
        QuestionComponent,
        MatButton,
        MatIcon,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
    ],
})
export class AngularQuizComponent implements OnInit {
    public readonly quizService: QuizService = inject(QuizService);

    public ngOnInit(): void {
        this.quizService
            .getQuestions()
            .subscribe((questions: QuestionInterface[]) => {
                this.quizService.questions.set(questions);
            });
    }
}
