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
  searchData: StockSearchEntry[] = [];
  currentIcon: SearchbarIcon = SearchbarIcon.search;
  searchResults: StockSearchEntry[] = []
  searchString: "";
  constructor(private router: Router, private stocksService: StocksService) { }

  ngOnInit(): void {
    this.searchData = [];
    this.fetchStockData();
  }

  async fetchStockData() {
    try {
      let response: any = await this.stocksService.searchStocks({ searchString: "" })
      this.searchData = response;
      this.sortStocks();
      this.loaded = true;
    } catch (err) {
      this.loaded = true;
    };
  }

  search() {
    this.currentIcon = SearchbarIcon.loading;
    this.searchResults = [];
    this.searchResults = this.searchData.filter((a) => {
      return a.stockName.toLowerCase().includes(this.searchString.toLowerCase())
    });
    this.currentIcon = SearchbarIcon.search;
  }

  sortStocks() {
    this.searchData = this.searchData.sort((a, b) => {
      if (a.stockName < b.stockName) {
        return -1;
      } else if (a.stockName > b.stockName) {
        return 1;
      }
      return 0;
    })
    this.searchResults = this.searchData;
  }

  checkStockDetails(stock: StockSearchEntry, index) {
    this.router.navigate(['stockdetails'], { queryParams: { stockId: stock.stockCode } });
  }

}
