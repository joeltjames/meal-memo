import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealEditModalComponent } from './meal-edit-modal.component';

describe('MealEditModalComponent', () => {
  let component: MealEditModalComponent;
  let fixture: ComponentFixture<MealEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
