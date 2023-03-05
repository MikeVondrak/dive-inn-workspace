import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalMapComponent } from './rental-map.component';

describe('RentalMapComponent', () => {
  let component: RentalMapComponent;
  let fixture: ComponentFixture<RentalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
