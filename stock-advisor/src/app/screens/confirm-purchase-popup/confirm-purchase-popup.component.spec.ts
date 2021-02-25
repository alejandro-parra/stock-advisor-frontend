import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurchasePopupComponent } from './confirm-purchase-popup.component';

describe('ConfirmPurchasePopupComponent', () => {
  let component: ConfirmPurchasePopupComponent;
  let fixture: ComponentFixture<ConfirmPurchasePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPurchasePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPurchasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
