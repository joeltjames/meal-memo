import {
    trigger,
    transition,
    style,
    animate,
    state,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faLink, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImportRecipeModalComponent } from '../import-recipe-modal/import-recipe-modal.component';

@Component({
    selector: 'app-recipe-menu',
    templateUrl: './recipe-menu.component.html',
    styleUrls: ['./recipe-menu.component.scss'],
    animations: [
        trigger('centerleft', [
            state('true', style({ width: 'calc(100% - 340px )' })),
            state('false', style({ width: '100%' })),
            transition('* => *', animate('300ms  linear')),
        ]),
    ],
})
export class RecipeMenuComponent implements OnInit {
    show = false;
    addIcon = faPlus;
    importIcon = faLink;

    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

    importRecipe() {
        this.modalService.open(ImportRecipeModalComponent, { size: 'lg' });
    }
}
