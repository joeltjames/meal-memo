import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanCalendarDropComponent } from './meal-plan-calendar-drop.component';

describe('MealPlanCalendarDropComponent', () => {
  let component: MealPlanCalendarDropComponent;
  let fixture: ComponentFixture<MealPlanCalendarDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPlanCalendarDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanCalendarDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
