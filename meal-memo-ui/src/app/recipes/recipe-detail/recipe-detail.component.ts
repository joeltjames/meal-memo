import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeState } from '../store/recipe.reducer';
import { recipeBySlugSelector } from '../store/recipe.selector';
import {
    faEdit,
    faPrint,
    faSave,
    faTimes,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { sorted } from 'src/app/utils';
import { formatIngredient } from '../recipe.utils';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, AfterViewInit {
    @ViewChild('titleHeight') titleTextarea: ElementRef;
    currentHeight = 200;
    printIcon = faPrint;
    editIcon = faEdit;
    deleteIcon = faTrash;
    saveIcon = faSave;
    closeIcon = faTimes;

    readonly = true;

    recipe$: Observable<Recipe | undefined>;

    formatIngredient = formatIngredient;

    sorted = sorted;

    private slug: string;

    constructor(
        private router: Router,
        route: ActivatedRoute,
        store: Store<{ recipe: RecipeState }>
    ) {
        this.recipe$ = route.params.pipe(
            map((params) => params.slug),
            tap((slug) => (this.slug = slug)),
            switchMap((slug) => store.select(recipeBySlugSelector(slug)))
        );
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    public print() {
        this.router
            .navigate([{ outlets: { print: ['recipes', this.slug, 'print'] } }])
            .then(() => {
                setTimeout(() => window.print());
            });
    }

    public getTitleHeight() {
        return `${this.currentHeight}px`;
    }

    public edit() {
        this.readonly = false;
    }

    public save() {
        this.readonly = true;
    }

    public stopEdit() {
        this.readonly = true;
    }

    public getInstructions(recipe: Recipe) {
        return recipe.instructions;
    }
}
