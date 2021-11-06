import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanCalendarComponent } from './meal-plan-calendar.component';

describe('MealPlanCalendarComponent', () => {
  let component: MealPlanCalendarComponent;
  let fixture: ComponentFixture<MealPlanCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPlanCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
