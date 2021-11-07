import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MealState, MealPlanState } from '../store';

@Component({
    selector: 'app-weekly-meal-plan',
    templateUrl: './weekly-meal-plan.component.html',
    styleUrls: ['./weekly-meal-plan.component.scss'],
})
export class WeeklyMealPlanComponent implements OnInit {
    public meal$: Observable<MealState>;

    constructor(store: Store<{ mealPlan: MealPlanState; meal: MealState }>) {
        this.meal$ = store.select('meal');
    }

    ngOnInit(): void {}
}
