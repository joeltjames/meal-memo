import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-meal-plan-calendar-drop',
  templateUrl: './meal-plan-calendar-drop.component.html',
  styleUrls: ['./meal-plan-calendar-drop.component.scss']
})
export class MealPlanCalendarDropComponent implements OnInit {
  @Input()
  public day: number | null = null;
  @Input()
  public recipe: Recipe | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  onDrop(event: any) {
    console.log(event);
  }

}
