import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAccountComponent } from './restaurant-account.component';

describe('RestaurantAccountComponent', () => {
  let component: RestaurantAccountComponent;
  let fixture: ComponentFixture<RestaurantAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
