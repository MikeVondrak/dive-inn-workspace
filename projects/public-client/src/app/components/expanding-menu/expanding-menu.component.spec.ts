import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingMenuComponent } from './expanding-menu.component';

describe('ExpandingMenuComponent', () => {
  let component: ExpandingMenuComponent;
  let fixture: ComponentFixture<ExpandingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandingMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
