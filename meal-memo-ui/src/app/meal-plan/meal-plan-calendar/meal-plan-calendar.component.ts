import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MealPlanCalendarDailyModalComponent } from '../meal-plan-calendar-daily-modal/meal-plan-calendar-daily-modal.component';

@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
})
export class MealPlanCalendarComponent implements OnInit {
    openModalSubject = new Subject<any>();

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

    onDrop(day: any, event: any) {
        const modal = this.modalService.open(MealPlanCalendarDailyModalComponent);
        modal.componentInstance.day = day;
        modal.componentInstance.recipe = event.data ? JSON.parse(event.data) : {};
    }
}
