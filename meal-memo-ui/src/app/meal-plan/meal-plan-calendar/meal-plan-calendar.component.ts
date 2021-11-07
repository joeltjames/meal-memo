import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { MealPlanCalendarDailyModalComponent } from '../meal-plan-calendar-daily-modal/meal-plan-calendar-daily-modal.component';
import { Store } from '@ngrx/store';
import { mealPlanSelectorGenerator, MealPlanState } from '../store';
import * as dayjs from 'dayjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MealPlanCalendarComponent implements OnInit {
    openModalSubject = new Subject<any>();
    mealPlan$: Observable<MealPlanState>;

    public startOfMonth = dayjs().startOf('month');
    public endOfMonth = dayjs().endOf('month');

    public meals: MealPlanState;

    mealOptions = [
        { id: 0, color: '#264653', name: 'Breakfast' },
        { id: 1, color: '#2a9d8f', name: 'Morning Snack' },
        { id: 2, color: '#e9c46a', name: 'Lunch' },
        { id: 3, color: '#f4a261', name: 'Afternoon Snack' },
        { id: 4, color: '#e76f51', name: 'Dinner' },
    ];

    constructor(
        private modalService: NgbModal,
        store: Store<{ mealPlan: MealPlanState }>,
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
    }

    ngOnInit(): void {}

    getCellHtml(date: string) {
        const theseMeals = this.meals[date];
        if (theseMeals) {
            let html = '';
            Object.keys(theseMeals).forEach((key) => {
                const mealId = parseInt(key, 10);
                const meal = this.mealOptions.filter((mo) => mo.id === mealId);
                if (meal && meal.length > 0) {
                    theseMeals[mealId].forEach((recipe) => {
                        html += `<div class="badge meal-badge" style="background: ${meal[0].color}">${recipe.name}</div>`;
                    });
                }
            });
            console.log(html);
            return this.domSanitizer.bypassSecurityTrustHtml(html);
        }
        return '';
    }

    onDrop(date: string, event: any) {
        const modal = this.modalService.open(MealPlanCalendarDailyModalComponent, { size: 'lg' });
        modal.componentInstance.date = dayjs(date, 'YYYY-MM-DD');
        modal.componentInstance.recipe = event.data ? JSON.parse(event.data) : {};
    }
}
