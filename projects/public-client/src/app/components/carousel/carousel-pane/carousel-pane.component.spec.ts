import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPaneComponent } from './carousel-pane.component';

describe('CarouselPaneComponent', () => {
  let component: CarouselPaneComponent;
  let fixture: ComponentFixture<CarouselPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
