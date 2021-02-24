import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockDetailsData } from 'src/app/interfaces/StockDetails';
import { StocksService } from 'src/app/services/stocks-service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {
  stockId: number;
  stockDetails: StockDetailsData;
  loaded = true;
  actionText = "comprar";


  constructor(private router: Router, private stocksService: StocksService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['stockId'];
      if(id){
        this.stockId = id;
        this.fetchStockDetails();
      }else{
        this.router.navigate(["search"])
      }
    });

    this.stockDetails = {
      stockName: 'Tesla',
      id: 1,
      stockCode: 'TSL',
      companyImg: 'http://www.abbeyroweautoglass.com/wp-content/uploads/2015/03/BMW.jpg',
      actualPrice: 250.00,
      updateDate: '21/02/2021',
      graphData: {},
      rateOfPrediction: 70,
      typeOfPrediction: 'positive',
      myOperations: [
        {
          operationId: 1,
          stockId: 1,
          stockCode: 'TSL',
          companyImg: 'http://www.abbeyroweautoglass.com/wp-content/uploads/2015/03/BMW.jpg',
          stockName: 'Tesla',
          creationDate: '12/01/2021',
          amountBought: 3,
          status: 'active',
          startingPrice: 200.00,
          closingDate: '12/03/2021',
          closingPrice: 250.00
        }
      ]
    }
  }

  fetchStockDetails() {
    //Llamar al endpoint
    if(this.stockDetails.typeOfPrediction === 'positive') {
      this.actionText = "comprar";
    } else {
      this.actionText = "vender";
    }
    this.loaded = true;
  }

  navigateMyOperations() {
    this.router.navigate(['myoperations']);
  }

  buyActions() {
  
  }

  sellActions() {
    
  }

}
