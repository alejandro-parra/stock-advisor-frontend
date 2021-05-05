import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyOperationsComponent } from './my-operations.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';

describe('MyOperationsComponent', () => {
  let component: MyOperationsComponent;
  let fixture: ComponentFixture<MyOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch between open and closed operations', () => {
    console.log('should switch between open and closed operations');
    expect(component.activeItem.id).toEqual('0');
    component.activeItem = component.items[1];
    expect(component.activeItem.id).toEqual('1');
    component.activeItem = component.items[0];
    expect(component.activeItem.id).toEqual('0');
    console.log('switch between open and closed operations successful');
  });
});
