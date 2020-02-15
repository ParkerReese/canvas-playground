import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingCirclesComponent } from './moving-circles.component';

describe('MovingCirclesComponent', () => {
  let component: MovingCirclesComponent;
  let fixture: ComponentFixture<MovingCirclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingCirclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
