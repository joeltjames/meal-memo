import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanCalendarDailyModalComponent } from './meal-plan-calendar-daily-modal.component';

describe('MealPlanCalendarDailyModalComponent', () => {
  let component: MealPlanCalendarDailyModalComponent;
  let fixture: ComponentFixture<MealPlanCalendarDailyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPlanCalendarDailyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPlanCalendarDailyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
