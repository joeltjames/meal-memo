import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { MealPlanCalendarDailyModalComponent } from '../meal-plan-calendar-daily-modal/meal-plan-calendar-daily-modal.component';
import { Store } from '@ngrx/store';
@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
})
export class MealPlanCalendarComponent implements OnInit {
    openModalSubject = new Subject<any>();
    mealPlan$: Observable<any>;

    // https://stackoverflow.com/questions/63690843/need-to-write-ngrx-selector-to-select-data-between-given-date-range
    constructor(private modalService: NgbModal, private store: Store<{ mealPlan: any }>) {
        this.mealPlan$ = store.select('mealPlan');

        this.mealPlan$.subscribe((mp) => {
            console.log(mp);
        });
    }

    ngOnInit(): void {}

    onDrop(day: any, event: any) {
        const modal = this.modalService.open(MealPlanCalendarDailyModalComponent, { size: 'lg' });
        modal.componentInstance.day = day;
        modal.componentInstance.recipe = event.data ? JSON.parse(event.data) : {};
    }
}
