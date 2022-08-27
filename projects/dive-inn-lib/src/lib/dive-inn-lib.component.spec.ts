import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveInnLibComponent } from './dive-inn-lib.component';

describe('DiveInnLibComponent', () => {
  let component: DiveInnLibComponent;
  let fixture: ComponentFixture<DiveInnLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiveInnLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiveInnLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
