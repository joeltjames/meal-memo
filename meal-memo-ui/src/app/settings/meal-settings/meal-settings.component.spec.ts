import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSettingsComponent } from './meal-settings.component';

describe('MealSettingsComponent', () => {
  let component: MealSettingsComponent;
  let fixture: ComponentFixture<MealSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
