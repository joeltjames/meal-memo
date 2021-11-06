import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
    selector: 'app-meal-plan-calendar-daily-modal',
    templateUrl: './meal-plan-calendar-daily-modal.component.html',
    styleUrls: ['./meal-plan-calendar-daily-modal.component.scss'],
})
export class MealPlanCalendarDailyModalComponent implements OnInit {
    @Input()
    public day: number | null = null;
    @Input()
    public recipe: Recipe | null = null;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {}
}
