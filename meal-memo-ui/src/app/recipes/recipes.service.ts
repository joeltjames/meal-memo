import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(private http: HttpClient) {}

    getRecipes({
        filter,
        page,
        limit,
    }: { filter?: string; page?: number; limit?: number } = {}): Observable<
        Recipe[]
    > {
        const queryParams: { [key: string]: string } = {};
        if (filter) {
            queryParams.filter = filter;
        }
        if (page) {
            queryParams.page = page.toString();
        }
        if (limit) {
            queryParams.limit = limit.toString();
        }
        return this.http.get<Recipe[]>('http://localhost:3000/api/recipes', {
            params: queryParams,
        });
    }

    importRecipe({ url }: { url: string }) {
        return this.http.post<Recipe>(
            'http://localhost:3000/api/recipes/import',
            {
                url,
            }
        );
    }
}
