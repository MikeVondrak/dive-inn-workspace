import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodLogosComponent } from './food-logos.component';

describe('FoodLogosComponent', () => {
  let component: FoodLogosComponent;
  let fixture: ComponentFixture<FoodLogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodLogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodLogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
