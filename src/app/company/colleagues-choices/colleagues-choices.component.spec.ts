import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleaguesChoicesComponent } from './colleagues-choices.component';

describe('ColleaguesChoicesComponent', () => {
  let component: ColleaguesChoicesComponent;
  let fixture: ComponentFixture<ColleaguesChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColleaguesChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleaguesChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
