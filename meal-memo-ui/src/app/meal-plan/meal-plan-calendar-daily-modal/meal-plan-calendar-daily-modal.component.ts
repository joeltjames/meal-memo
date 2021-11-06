import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/interfaces/recipe';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addRecipeToMeal } from '../store/meal-plan.actions';
import { Meal } from 'src/app/interfaces/meal';
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
    public plusCircle = faPlusCircle;

    mealOptions = [
        { id: 0, color: '#264653', name: 'Breakfast' },
        { id: 1, color: '#2a9d8f', name: 'Morning Snack' },
        { id: 2, color: '#e9c46a', name: 'Lunch' },
        { id: 3, color: '#f4a261', name: 'Afternoon Snack' },
        { id: 4, color: '#e76f51', name: 'Dinner' },
    ];

    meals: { [num: number]: Recipe[] } = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
    };

    private toAdd: { meal: Meal; recipe: Recipe }[] = [];

    constructor(public activeModal: NgbActiveModal, private store: Store) {}

    ngOnInit(): void {}

    public getMealOptions(meal: any): any[] {
        return this.meals[meal.id] || [];
    }

    public addRecipe(meal: any) {
        if (this.recipe) {
            this.meals[meal.id].push(this.recipe);
            this.toAdd.push({ meal, recipe: this.recipe });
        }
    }

    public onSave() {
        this.toAdd.forEach((toAdd) => {
            this.store.dispatch(addRecipeToMeal({ meal: toAdd.meal, recipe: toAdd.recipe, date: new Date() }));
        });

        this.activeModal.close('save');
    }
}
