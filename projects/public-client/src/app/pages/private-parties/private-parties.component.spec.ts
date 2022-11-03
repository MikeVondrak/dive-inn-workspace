import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePartiesComponent } from './private-parties.component';

describe('PrivatePartiesComponent', () => {
  let component: PrivatePartiesComponent;
  let fixture: ComponentFixture<PrivatePartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePartiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivatePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
