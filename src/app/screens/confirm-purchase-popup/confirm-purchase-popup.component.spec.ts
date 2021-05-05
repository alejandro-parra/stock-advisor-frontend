import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPurchasePopupComponent } from './confirm-purchase-popup.component';
import { AppModule } from 'src/app/app.module';

describe('ConfirmPurchasePopupComponent', () => {
  let component: ConfirmPurchasePopupComponent;
  let fixture: ComponentFixture<ConfirmPurchasePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
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
