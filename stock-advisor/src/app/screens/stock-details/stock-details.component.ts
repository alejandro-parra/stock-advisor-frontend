import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Operation } from 'src/app/interfaces/MyOperations';
import { StockDetailsData } from 'src/app/interfaces/StockDetails';
import { StocksService } from 'src/app/services/stocks-service';
import { ConfirmPurchasePopupComponent } from '../confirm-purchase-popup/confirm-purchase-popup.component';
import { SelectOperationPopupComponent } from '../select-operation-popup/select-operation-popup.component';

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
  activeOperations: Operation[] = [];

  constructor(private router: Router, private stocksService: StocksService, private activatedRoute: ActivatedRoute, public dialogService: DialogService) { }

  ngOnInit(): void {
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
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['stockId'];
      if(id){
        this.stockId = id;
        this.fetchStockDetails();
      }else{
        this.router.navigate(["search"])
      }
    });

    
  }

  fetchStockDetails() {
    //Llamar al endpoint
    this.setActionText();
    this.defineActiveOperations();
    this.loaded = true;
  }

  defineActiveOperations() {
    for(let operation of this.stockDetails.myOperations) {
      if(operation.status === 'active') {
        this.activeOperations.push(operation);
      }
    }
  }

  setActionText() {
    if(this.stockDetails.typeOfPrediction === 'positive') {
      this.actionText = "comprar";
    } else {
      this.actionText = "vender";
    }
  }

  navigateMyOperations() {
    this.router.navigate(['myoperations']);
  }

  buyActions() {
    const ref = this.dialogService.open(ConfirmPurchasePopupComponent, {
      header: 'Confirma tu compra',
      width: '70%',
      data: {
        stockId: this.stockDetails.id,
        stockCode: this.stockDetails.stockCode,
        companyImg: this.stockDetails.companyImg,
        stockName: this.stockDetails.stockName,
        creationDate: this.createDateString(),
        amountBought: 0,
        status: 'active',
        startingPrice: this.stockDetails.actualPrice
      },
    });
    ref.onClose.subscribe((operation) => {
      if(operation !== undefined || operation !== null){
        //Llamar a la API pa vender
      }
    });
  }

  sellActions() {
    const ref = this.dialogService.open(SelectOperationPopupComponent, {
      header: 'Elige la operación a vender',
      width: '70%',
      data: this.activeOperations,
    });
    ref.onClose.subscribe((operation) => {
      if(operation !== undefined || operation !== null){
        //Llamar a la API pa vender
      }
    });
  }

  createDateString() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10) {
      return `${day}-0${month}-${year}`
    } else {
      return `${day}-${month}-${year}`
    }
  }

}
