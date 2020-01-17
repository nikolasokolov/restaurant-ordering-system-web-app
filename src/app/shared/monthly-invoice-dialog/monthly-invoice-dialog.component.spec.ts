import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyInvoiceDialogComponent } from './monthly-invoice-dialog.component';

describe('MonthlyInvoiceDialogComponent', () => {
  let component: MonthlyInvoiceDialogComponent;
  let fixture: ComponentFixture<MonthlyInvoiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyInvoiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
