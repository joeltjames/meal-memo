import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/interfaces/recipe';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addRecipeToMeal, removeRecipeFromMeal } from '../store/meal-plan.actions';
import { Meal } from 'src/app/interfaces/meal';
import * as dayjs from 'dayjs';
import { mealPlanSelectorGenerator, MealPlanState, mealSelector, MealState } from '../store';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-meal-plan-calendar-daily-modal',
    templateUrl: './meal-plan-calendar-daily-modal.component.html',
    styleUrls: ['./meal-plan-calendar-daily-modal.component.scss'],
})
export class MealPlanCalendarDailyModalComponent implements OnInit {
    @Input()
    public date: dayjs.Dayjs;
    @Input()
    public recipe: Recipe;
    @Input()
    public meals: { [key: string]: Recipe[] } = {};

    public plusCircle = faPlusCircle;
    public timesCircle = faTimesCircle;
    mealPlan$: Observable<MealPlanState>;

    meal$: Observable<MealState>;

    private dateStr: string;

    private toAdd: { meal: Meal; recipe: Recipe }[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private store: Store<{ mealPlan: MealPlanState; meal: MealState }>
    ) {}

    ngOnInit(): void {
        this.mealPlan$ = this.store.select(
            mealPlanSelectorGenerator(this.date.format('YYYY-MM-DD'), this.date.add(1, 'd').format('YYYY-MM-DD'))
        );

        this.mealPlan$.subscribe((mp) => {
            console.log(mp);
        });

        this.meal$ = this.store.select('meal');

        this.dateStr = this.date.format('YYYY-MM-DD');
    }

    public getMealRecipes(meal: Meal): Recipe[] {
        return this.meals && meal.key in this.meals ? this.meals[meal.key] : [];
    }

    public getMealObs(meal: Meal): Observable<Recipe[]> {
        return this.mealPlan$.pipe(
            map((data) => {
                if (this.dateStr in data && meal.key in data[this.dateStr]) {
                    return data[this.dateStr][meal.key];
                }
                return [];
            })
        );
    }

    public addRecipe(meal: Meal) {
        if (this.recipe) {
            this.store.dispatch(addRecipeToMeal({ meal, recipe: this.recipe, date: this.date.toDate() }));
        }
    }

    public removeRecipe(meal: Meal, recipe: Recipe) {
        this.store.dispatch(removeRecipeFromMeal({ meal, recipe, date: this.date.toDate() }));
    }

    public onSave() {
        this.toAdd.forEach((toAdd) => {
            this.store.dispatch(addRecipeToMeal({ meal: toAdd.meal, recipe: toAdd.recipe, date: this.date.toDate() }));
        });

        this.activeModal.close('save');
    }
}
