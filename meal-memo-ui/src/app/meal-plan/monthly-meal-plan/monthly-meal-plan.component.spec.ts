import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMealPlanComponent } from './monthly-meal-plan.component';

describe('MonthlyMealPlanComponent', () => {
  let component: MonthlyMealPlanComponent;
  let fixture: ComponentFixture<MonthlyMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyMealPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
