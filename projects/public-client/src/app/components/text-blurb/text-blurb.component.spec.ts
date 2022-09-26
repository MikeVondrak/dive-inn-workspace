import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBlurbComponent } from './text-blurb.component';

describe('TextBlurbComponent', () => {
  let component: TextBlurbComponent;
  let fixture: ComponentFixture<TextBlurbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBlurbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBlurbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
