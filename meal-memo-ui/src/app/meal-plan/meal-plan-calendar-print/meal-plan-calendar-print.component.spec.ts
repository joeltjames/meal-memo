import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanCalendarPrintComponent } from './meal-plan-calendar-print.component';

describe('MealPlanCalendarPrintComponent', () => {
  let component: MealPlanCalendarPrintComponent;
  let fixture: ComponentFixture<MealPlanCalendarPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPlanCalendarPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanCalendarPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
