import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    localStorage.setItem('StockAdvisorUser', '{"id":"6033481974298d1b802312bd","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTWFpbCI6Imhzc19mcmFuY2lzY29AaG90bWFpbC5jb20iLCJpZCI6IjYwMzM0ODE5NzQyOThkMWI4MDIzMTJiZCIsImlhdCI6MTYyMDA5NzM0NiwiZXhwIjoxNjIwNzAyMTQ2fQ.VkQFrwzNIdKC-GG5gAQOCs9D8x_fWmGf4d0kjEUBPgI","name":"Francisco","email":"hss_francisco@hotmail.com","lastName":"Sanchez Salomon","operations":[{"_id":"6088dc00852c6f10a09a25ef","stockCode":"GOOG","companyImg":"http://logo.clearbit.com/google.com","stockName":"Alphabet Inc. Class C","creationDate":"2021-04-26","amountBought":"100","status":"closed","startingPrice":2326.73999,"closingDate":"2021-04-26","closingPrice":2326.73999},{"_id":"6088dc1f852c6f10a09a25f0","stockCode":"AMZN","companyImg":"http://logo.clearbit.com/amazon.com","stockName":"Amazon","creationDate":"2021-04-26","amountBought":"10","status":"active","startingPrice":3409}]}');
    component.userService.userInfo = JSON.parse('{"id":"6033481974298d1b802312bd","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTWFpbCI6Imhzc19mcmFuY2lzY29AaG90bWFpbC5jb20iLCJpZCI6IjYwMzM0ODE5NzQyOThkMWI4MDIzMTJiZCIsImlhdCI6MTYyMDA5NzM0NiwiZXhwIjoxNjIwNzAyMTQ2fQ.VkQFrwzNIdKC-GG5gAQOCs9D8x_fWmGf4d0kjEUBPgI","name":"Francisco","email":"hss_francisco@hotmail.com","lastName":"Sanchez Salomon","operations":[{"_id":"6088dc00852c6f10a09a25ef","stockCode":"GOOG","companyImg":"http://logo.clearbit.com/google.com","stockName":"Alphabet Inc. Class C","creationDate":"2021-04-26","amountBought":"100","status":"closed","startingPrice":2326.73999,"closingDate":"2021-04-26","closingPrice":2326.73999},{"_id":"6088dc1f852c6f10a09a25f0","stockCode":"AMZN","companyImg":"http://logo.clearbit.com/amazon.com","stockName":"Amazon","creationDate":"2021-04-26","amountBought":"10","status":"active","startingPrice":3409}]}')
    component.userService.authState.next(true);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout button should log off the user and redirect to login', async () => {
    console.log('logout button should log off the user and redirect to login')
    await component.userService.logout();
    expect(router.url).toBe('/login');
    console.log('Logout button successful');
  });

  it('logo button should redirect to search', fakeAsync(() => {
    console.log('logo button should redirect to search')
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(router.url).toBe('/search');
    console.log('Logo button home redirect successful');
  }));
});
