import {
    Component,
    computed,
    inject,
    input,
    InputSignal,
    Signal,
} from "@angular/core";
import { QuizService } from "../../services/quiz.service";
import { CommonModule } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatGridTile } from "@angular/material/grid-list";

@Component({
    selector: "angular-quiz-answer",
    templateUrl: "./answer.component.html",
    styleUrl: "./answer.component.css",
    standalone: true,
    imports: [CommonModule, MatButton, MatGridTile],
})
export class AnswerComponent {
    public readonly quizService: QuizService = inject(QuizService);
    public answerText: InputSignal<string> = input.required();
    public isCorrectAnswer: Signal<boolean> = computed(
        () =>
            !!this.quizService.currentAnswer() &&
            this.answerText() ===
                this.quizService.currentQuestion().correctAnswer,
    );
    public isWrongAnswer: Signal<boolean> = computed(
        () =>
            this.answerText() === this.quizService.currentAnswer() &&
            this.quizService.currentAnswer() !==
                this.quizService.currentQuestion().correctAnswer,
    );
    public isButtonDisabled: Signal<boolean> = computed(
        () => !!this.quizService.currentAnswer(),
    );
}
