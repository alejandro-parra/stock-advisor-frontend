import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOperationPopupComponent } from './select-operation-popup.component';

describe('SelectOperationPopupComponent', () => {
  let component: SelectOperationPopupComponent;
  let fixture: ComponentFixture<SelectOperationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOperationPopupComponent ]
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
