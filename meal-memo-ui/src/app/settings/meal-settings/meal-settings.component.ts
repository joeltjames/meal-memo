import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
    mealSelector,
    MealState,
    removeMeal,
    reorderMeals,
} from 'src/app/meal-plan/store';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DragulaService } from 'ng2-dragula';
import { Meal } from 'src/app/interfaces/meal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MealEditModalComponent } from './meal-edit-modal/meal-edit-modal.component';
@Component({
    selector: 'app-meal-settings',
    templateUrl: './meal-settings.component.html',
    styleUrls: ['./meal-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MealSettingsComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MEALS = 'MEALS';
    meals: MealState;
    addIcon = faPlusCircle;
    removeIcon = faTimesCircle;

    subs = new Subscription();

    constructor(
        private store: Store<{ meal: MealState }>,
        private modalService: NgbModal,
        dragulaService: DragulaService
    ) {
        dragulaService.destroy(this.MEALS);
        dragulaService.createGroup(this.MEALS, {
            removeOnSpill: true,
        });
        this.subs.add(
            dragulaService
                .dropModel(this.MEALS)
                .subscribe(({ targetModel }) => {
                    this.store.dispatch(
                        reorderMeals({
                            updatedOrder: targetModel.map((meal, index) => {
                                const mutableMeal = JSON.parse(
                                    JSON.stringify(meal)
                                ) as Meal;
                                mutableMeal.order = index;
                                return mutableMeal;
                            }),
                        })
                    );
                })
        );
        this.subs.add(
            dragulaService
                .removeModel(this.MEALS)
                .subscribe(({ item }) => this.removeMeal(item))
        );

        this.store.select(mealSelector).subscribe((meals) => {
            this.meals = JSON.parse(JSON.stringify(meals)) as MealState;
        });
    }

    ngOnInit(): void {}

    public removeMeal(meal: Meal) {
        this.store.dispatch(removeMeal({ toRemove: meal }));
    }

    public editMeal(meal: Meal) {
        const modalRef = this.modalService.open(MealEditModalComponent);
        modalRef.componentInstance.meal = meal;
    }

    public addMeal() {
        this.modalService.open(MealEditModalComponent);
    }
}
