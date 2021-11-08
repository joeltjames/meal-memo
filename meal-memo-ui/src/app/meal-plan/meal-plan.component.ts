import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Recipe } from '../interfaces/recipe';

@Component({
    selector: 'app-meal-plan',
    templateUrl: './meal-plan.component.html',
    styleUrls: ['./meal-plan.component.scss'],
})
export class MealPlanComponent implements OnInit {
    recipeSearch = new FormControl('');

    allRecipes: Recipe[] = [];

    activeRecipes = this.allRecipes;

    search = faSearch;

    constructor() {}

    ngOnInit(): void {}
}
