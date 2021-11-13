import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Meal } from 'src/app/interfaces/meal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-meal-edit-modal',
    templateUrl: './meal-edit-modal.component.html',
    styleUrls: ['./meal-edit-modal.component.scss'],
})
export class MealEditModalComponent implements OnInit {
    @Input()
    public meal: Meal;
    color = '#FFF';

    mealForm = new FormGroup({
        name: new FormControl(''),
        color: new FormControl(''),
    });

    presetColors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {
        console.log(this.meal);
        if (this.meal) {
            this.mealForm.get('name')?.setValue(this.meal.name);
            this.mealForm.get('color')?.setValue(this.meal.color);
        }
    }
}
