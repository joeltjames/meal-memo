import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMealPlanComponent } from './weekly-meal-plan.component';

describe('WeeklyMealPlanComponent', () => {
  let component: WeeklyMealPlanComponent;
  let fixture: ComponentFixture<WeeklyMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyMealPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
