import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDailyMealPlanModalComponent } from './edit-daily-meal-plan-modal.component';

describe('EditDailyMealPlanModalComponent', () => {
  let component: EditDailyMealPlanModalComponent;
  let fixture: ComponentFixture<EditDailyMealPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDailyMealPlanModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDailyMealPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
