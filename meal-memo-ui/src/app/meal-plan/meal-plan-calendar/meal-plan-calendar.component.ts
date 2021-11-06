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
})
export class MealPlanCalendarComponent implements OnInit {
    openModalSubject = new Subject<any>();
    mealPlan$: Observable<any>;

    public startOfMonth = dayjs().startOf('month');
    public endOfMonth = dayjs().endOf('month');

    constructor(private modalService: NgbModal, store: Store<{ mealPlan: MealPlanState }>, private domSanitizer: DomSanitizer) {
        this.mealPlan$ = store.select(
            mealPlanSelectorGenerator(
                this.startOfMonth.format('YYYY-MM-DD'),
                this.endOfMonth.add(1, 'd').format('YYYY-MM-DD')
            )
        );

        this.mealPlan$.subscribe((mp) => {
            console.log(mp);
        });
    }

    ngOnInit(): void {}

    getCellHtml(date: string) {
        return this.domSanitizer.bypassSecurityTrustHtml(`<small>${date}</small>`);
    }

    onDrop(day: any, event: any) {
        const modal = this.modalService.open(MealPlanCalendarDailyModalComponent, { size: 'lg' });
        modal.componentInstance.day = day;
        modal.componentInstance.recipe = event.data ? JSON.parse(event.data) : {};
    }
}
