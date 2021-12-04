import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadRecipes } from './recipes/store/recipe.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'meal-memo-ui';

    constructor(store: Store) {
        store.dispatch(loadRecipes({}));
    }

    ngOnInit() {}
}
