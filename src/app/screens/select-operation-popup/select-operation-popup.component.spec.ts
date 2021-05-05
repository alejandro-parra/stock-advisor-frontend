import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectOperationPopupComponent } from './select-operation-popup.component';
import { AppModule } from 'src/app/app.module';

describe('SelectOperationPopupComponent', () => {
  let component: SelectOperationPopupComponent;
  let fixture: ComponentFixture<SelectOperationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOperationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
