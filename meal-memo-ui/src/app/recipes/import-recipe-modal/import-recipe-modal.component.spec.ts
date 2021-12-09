import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRecipeModalComponent } from './import-recipe-modal.component';

describe('ImportRecipeModalComponent', () => {
  let component: ImportRecipeModalComponent;
  let fixture: ComponentFixture<ImportRecipeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRecipeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportRecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
