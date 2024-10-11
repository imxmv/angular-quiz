import {
    Injectable,
    computed,
    inject,
    signal,
    WritableSignal,
    Signal,
} from "@angular/core";
import { QuestionInterface } from "../types/question.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SortableAnswerInterface } from "../types/sortableAnswer.interface";

@Injectable({ providedIn: "root" })
export class QuizService {
    public readonly http: HttpClient = inject(HttpClient);
    public questions: WritableSignal<QuestionInterface[]> = signal([]);
    public currentQuestionIndex: WritableSignal<number> = signal(0);
    public currentAnswer: WritableSignal<string | null> = signal(null);
    public correctAnswersCount: WritableSignal<number> = signal(0);
    public error: WritableSignal<string | null> = signal(null);
    public currentQuestion: Signal<QuestionInterface> = computed(
        () => this.questions()[this.currentQuestionIndex()],
    );
    public showResults: Signal<boolean> = computed(
        () => this.currentQuestionIndex() === this.questions().length - 1,
    );
    public currentQuestionAnswers: Signal<string[]> = computed(() =>
        this.shuffleAnswers(this.currentQuestion()),
    );

    public selectAnswer(answerText: string): void {
        this.currentAnswer.set(answerText);
        const correctAnswersCount: number =
            answerText === this.currentQuestion().correctAnswer
                ? this.correctAnswersCount() + 1
                : this.correctAnswersCount();
        this.correctAnswersCount.set(correctAnswersCount);
    }

    public goToNextQuestion(): void {
        const currentQuestionIndex: number = this.showResults()
            ? this.currentQuestionIndex()
            : this.currentQuestionIndex() + 1;
        this.currentQuestionIndex.set(currentQuestionIndex);
        this.currentAnswer.set(null);
    }

    public restart(): void {
        this.currentQuestionIndex.set(0);
        this.correctAnswersCount.set(0);
    }

    public getQuestions(): Observable<QuestionInterface[]> {
        return this.http.get<QuestionInterface[]>("assets/questions.json");
    }

    private shuffleAnswers(question: QuestionInterface): string[] {
        const unshuffledAnswers: string[] = [
            question.correctAnswer,
            ...question.incorrectAnswers,
        ];

        return unshuffledAnswers
            .map(
                (a: string): SortableAnswerInterface => ({
                    sort: Math.random(),
                    answer: a,
                }),
            )
            .sort(
                (a: SortableAnswerInterface, b: SortableAnswerInterface) =>
                    a.sort - b.sort,
            )
            .map((a: SortableAnswerInterface) => a.answer);
    }
}
