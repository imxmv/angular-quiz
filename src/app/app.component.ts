import { Component } from "@angular/core";
import { AngularQuizComponent } from "./angular-quiz/angular-quiz.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [AngularQuizComponent],
    templateUrl: "./app.component.html",
})
export class AppComponent {}
