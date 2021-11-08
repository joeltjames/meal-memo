import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/interfaces/meal';
import { EditDailyMealPlanModalComponent } from '../edit-daily-meal-plan-modal/edit-daily-meal-plan-modal.component';
import { mealPlanSelectorGenerator, MealPlanState, MealState } from '../store';

@Component({
    selector: 'app-monthly-meal-plan',
    templateUrl: './monthly-meal-plan.component.html',
    styleUrls: ['./monthly-meal-plan.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MonthlyMealPlanComponent implements OnInit {
    mealPlan$: Observable<MealPlanState>;

    public startOfMonth = dayjs().startOf('month');
    public endOfMonth = dayjs().endOf('month');

    public meals: MealPlanState;

    meal$: Observable<MealState>;

    mealOptions: Meal[];

    constructor(
        private modalService: NgbModal,
        store: Store<{ mealPlan: MealPlanState; meal: MealState }>,
        private domSanitizer: DomSanitizer
    ) {
        this.mealPlan$ = store.select(
            mealPlanSelectorGenerator(
                this.startOfMonth.format('YYYY-MM-DD'),
                this.endOfMonth.add(1, 'd').format('YYYY-MM-DD')
            )
        );

        this.mealPlan$.subscribe((mp) => {
            this.meals = mp;
        });

        store.select('meal').subscribe((meals) => {
            this.mealOptions = meals;
        });
    }

    ngOnInit(): void {}

    onDrop(date: string, event: any) {
        const modal = this.modalService.open(EditDailyMealPlanModalComponent, { size: 'lg' });
        modal.componentInstance.date = dayjs(date, 'YYYY-MM-DD');
        modal.componentInstance.recipe = event.data ? JSON.parse(event.data) : {};
    }

    editMealPlan(date: string) {
        const modal = this.modalService.open(EditDailyMealPlanModalComponent, { size: 'lg' });
        const dateObj = dayjs(date, 'YYYY-MM-DD');
        modal.componentInstance.date = dateObj;
        modal.componentInstance.meals = this.meals[date];
    }

    getCellHtml(date: string) {
        const theseMeals = this.meals[date];
        if (theseMeals) {
            let html = '';
            Object.keys(theseMeals).forEach((key) => {
                const meal = this.mealOptions.filter((mo) => mo.key === key);
                if (meal && meal.length > 0) {
                    theseMeals[key].forEach((recipe) => {
                        html += `<div class="badge meal-badge" style="background: ${meal[0].color}">${recipe.name}</div>`;
                    });
                }
            });
            return this.domSanitizer.bypassSecurityTrustHtml(html);
        }
        return '';
    }
}
