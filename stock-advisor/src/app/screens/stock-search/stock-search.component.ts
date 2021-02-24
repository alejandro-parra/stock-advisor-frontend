import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchStocksData, StockSearchEntry } from 'src/app/interfaces/Search';
import { StocksService } from 'src/app/services/stocks-service';

enum SearchbarIcon {
  search = "pi pi-search",
  loading = "pi pi-spin pi-spinner"
}

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})

export class StockSearchComponent implements OnInit {
  loaded = true;
  searchData: SearchStocksData = {stocks: [
    {
      stockCode: 'AWS',
      companyImage: 'http://www.abbeyroweautoglass.com/wp-content/uploads/2015/03/BMW.jpg',
      stockName: 'BMW',
      id: 1
    },
    {
      stockCode: 'KFC',
      companyImage: 'http://www.abbeyroweautoglass.com/wp-content/uploads/2015/03/BMW.jpg',
      stockName: 'Tesla',
      id: 2
    }
  ]}
  currentIcon: SearchbarIcon = SearchbarIcon.search;
  searchResults: StockSearchEntry[] = []
  searchString: "";
  constructor(private router: Router, private stocksService: StocksService) { }

  ngOnInit(): void {
    this.fetchStockData();
  }

  fetchStockData() {
    //llamar al endpoint
    this.sortStocks();
    this.loaded = true;
  }

  search() {
    console.log('search')
    this.currentIcon = SearchbarIcon.loading;
    this.searchResults = [];
    this.searchResults = this.searchData.stocks.filter((a) => {
      return a.stockName.toLowerCase().includes(this.searchString.toLowerCase())
    });
    console.log(this.searchResults)
    this.currentIcon = SearchbarIcon.search;
  }

  sortStocks() {
    this.searchData.stocks = this.searchData.stocks.sort((a,b) => {
      if(a.stockName < b.stockName) {
        return -1;
      } else if(a.stockName > b.stockName) {
        return 1;
      } 
      return 0;
    })
    this.searchResults = this.searchData.stocks;
  }

  checkStockDetails(stock: StockSearchEntry, index) {
    console.log(index)
    this.router.navigate(['stockdetails'], { queryParams: {stockId: stock.id}});
  }

}
