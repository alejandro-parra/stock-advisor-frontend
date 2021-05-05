import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AppModule } from 'src/app/app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login inputs should validate properly', () => {
    console.log('Login inputs should validate properly');
    const questionnaire = component.questionnaire;
    const email = questionnaire.controls['email'];
    const pswd = questionnaire.controls['password'];

    email.setValue('test@mail.com');
    pswd.setValue('');
    expect(questionnaire.valid).toBeFalsy();

    email.setValue('wrongMail');
    pswd.setValue('secret');
    expect(questionnaire.valid).toBeFalsy();

    email.setValue('');
    pswd.setValue('secret');
    expect(questionnaire.valid).toBeFalsy();

    email.setValue('test@mail.com');
    pswd.setValue('secret');
    expect(questionnaire.valid).toBeTruthy();
    console.log('Login input validations successful');
  });
});
