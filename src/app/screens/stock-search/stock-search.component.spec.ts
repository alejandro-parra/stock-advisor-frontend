import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockSearchComponent } from './stock-search.component';
import { AppModule } from 'src/app/app.module';

describe('StockSearchComponent', () => {
  let component: StockSearchComponent;
  let fixture: ComponentFixture<StockSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSearchComponent);
    component = fixture.componentInstance;
    localStorage.setItem('StockAdvisorUser', '{"id":"6033481974298d1b802312bd","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTWFpbCI6Imhzc19mcmFuY2lzY29AaG90bWFpbC5jb20iLCJpZCI6IjYwMzM0ODE5NzQyOThkMWI4MDIzMTJiZCIsImlhdCI6MTYyMDA5NzM0NiwiZXhwIjoxNjIwNzAyMTQ2fQ.VkQFrwzNIdKC-GG5gAQOCs9D8x_fWmGf4d0kjEUBPgI","name":"Francisco","email":"hss_francisco@hotmail.com","lastName":"Sanchez Salomon","operations":[{"_id":"6088dc00852c6f10a09a25ef","stockCode":"GOOG","companyImg":"http://logo.clearbit.com/google.com","stockName":"Alphabet Inc. Class C","creationDate":"2021-04-26","amountBought":"100","status":"closed","startingPrice":2326.73999,"closingDate":"2021-04-26","closingPrice":2326.73999},{"_id":"6088dc1f852c6f10a09a25f0","stockCode":"AMZN","companyImg":"http://logo.clearbit.com/amazon.com","stockName":"Amazon","creationDate":"2021-04-26","amountBought":"10","status":"active","startingPrice":3409}]}');
    component.stocksService.userService.userInfo = JSON.parse('{"id":"6033481974298d1b802312bd","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTWFpbCI6Imhzc19mcmFuY2lzY29AaG90bWFpbC5jb20iLCJpZCI6IjYwMzM0ODE5NzQyOThkMWI4MDIzMTJiZCIsImlhdCI6MTYyMDA5NzM0NiwiZXhwIjoxNjIwNzAyMTQ2fQ.VkQFrwzNIdKC-GG5gAQOCs9D8x_fWmGf4d0kjEUBPgI","name":"Francisco","email":"hss_francisco@hotmail.com","lastName":"Sanchez Salomon","operations":[{"_id":"6088dc00852c6f10a09a25ef","stockCode":"GOOG","companyImg":"http://logo.clearbit.com/google.com","stockName":"Alphabet Inc. Class C","creationDate":"2021-04-26","amountBought":"100","status":"closed","startingPrice":2326.73999,"closingDate":"2021-04-26","closingPrice":2326.73999},{"_id":"6088dc1f852c6f10a09a25f0","stockCode":"AMZN","companyImg":"http://logo.clearbit.com/amazon.com","stockName":"Amazon","creationDate":"2021-04-26","amountBought":"10","status":"active","startingPrice":3409}]}')
    component.stocksService.userService.authState.next(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Search bar 'w' should find 'Walmart Inc.' and 'Walt Disney Company'", async () => {
    console.log("Search bar 'w' should find 'Walmart Inc.' and 'Walt Disney Company'");
    await component.fetchStockData();
    component.searchString = 'w';
    component.search();
    expect(component.searchResults.length).toBeGreaterThanOrEqual(2);
    expect(component.searchResults.find(elem => elem.stockName === 'Walmart Inc.')).not.toBeUndefined();
    expect(component.searchResults.find(elem => elem.stockName === 'Walt Disney Company (The)')).not.toBeUndefined();
    console.log('Search bar should find successful');
  });
});
