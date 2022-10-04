import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgAnswerComponent } from './img-answer.component';

describe('ImgAnswerComponent', () => {
  let component: ImgAnswerComponent;
  let fixture: ComponentFixture<ImgAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
