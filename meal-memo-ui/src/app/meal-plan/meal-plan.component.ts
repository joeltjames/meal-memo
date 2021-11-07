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

    constructor() {
        for (let i = 0; i < 100; i++) {
            this.allRecipes.push({ id: i, name: `Recipe ${i}` });
        }

        this.activeRecipes = this.allRecipes;

        this.recipeSearch.valueChanges.pipe(debounceTime(1000)).subscribe((filterValue) => {
          this.activeRecipes = this.allRecipes.filter(recipe =>
            recipe.name.includes(filterValue)
          );
        });
    }

    ngOnInit(): void {}

    stringify(val: any) {
      return JSON.stringify(val);
    }
}
