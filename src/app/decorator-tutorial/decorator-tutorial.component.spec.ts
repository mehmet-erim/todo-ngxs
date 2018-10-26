import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorTutorialComponent } from './decorator-tutorial.component';

describe('DecoratorTutorialComponent', () => {
  let component: DecoratorTutorialComponent;
  let fixture: ComponentFixture<DecoratorTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoratorTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
