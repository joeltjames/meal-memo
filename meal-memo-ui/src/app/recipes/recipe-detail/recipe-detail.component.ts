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
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeState } from '../store/recipe.reducer';
import { recipeBySlugSelector } from '../store/recipe.selector';
import {
    faEdit,
    faHeading,
    faPrint,
    faSave,
    faSort,
    faTimes,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { sorted } from 'src/app/utils';
import { formatIngredient } from '../recipe.utils';
import { FormArray, FormGroup } from '@angular/forms';
import { recipeToForm } from './recipe-detail.utils';
import { DragulaService } from 'ng2-dragula';

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
    headingIcon = faHeading;
    orderIcon = faSort;

    readonly = true;

    recipe$: Observable<Recipe | undefined>;

    recipeForm: FormGroup;

    formatIngredient = formatIngredient;

    sorted = sorted;

    ingredientsHandles = 'handles_ing';
    instructionsHandles = 'handles_ins';

    private slug: string;

    private subs = new Subscription();

    constructor(
        private router: Router,
        route: ActivatedRoute,
        store: Store<{ recipe: RecipeState }>,
        dragulaService: DragulaService
    ) {
        this.recipe$ = route.params.pipe(
            map((params) => params.slug),
            tap((slug) => (this.slug = slug)),
            switchMap((slug) => store.select(recipeBySlugSelector(slug))),
            tap((recipe) => (this.recipeForm = recipeToForm(recipe)))
        );

        dragulaService.createGroup(this.ingredientsHandles, {
            moves: (_el, _container, handle) =>
                (handle?.className.indexOf('handle') || -1) >= 0,
        });

        dragulaService.createGroup(this.instructionsHandles, {
            moves: (_el, _container, handle) =>
                (handle?.className.indexOf('handle') || -1) >= 0,
        });
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    public get ingredientsFormArray() {
        return this.recipeForm.controls.ingredients as FormArray;
    }

    public get instructionsFormArray() {
        return this.recipeForm.controls.instructions as FormArray;
    }

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
