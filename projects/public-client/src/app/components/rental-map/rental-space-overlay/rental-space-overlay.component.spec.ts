import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalSpaceOverlayComponent } from './rental-space-overlay.component';

describe('RentalSpaceOverlayComponent', () => {
  let component: RentalSpaceOverlayComponent;
  let fixture: ComponentFixture<RentalSpaceOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalSpaceOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalSpaceOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
