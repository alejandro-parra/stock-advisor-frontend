import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Operation } from 'src/app/interfaces/MyOperations';
import { StockDetailsData } from 'src/app/interfaces/StockDetails';
import { StocksService } from 'src/app/services/stocks-service';
import { ConfirmPurchasePopupComponent } from '../confirm-purchase-popup/confirm-purchase-popup.component';
import { SelectOperationPopupComponent } from '../select-operation-popup/select-operation-popup.component';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit, AfterViewInit {
  stockId: number;
  stockDetails: StockDetailsData;
  loaded = false;
  actionText = "comprar";
  activeOperations: Operation[] = [];
  chart: any
  demo = false;
  @ViewChild('graphContainer') graph: ElementRef;

  constructor(private router: Router, private stocksService: StocksService, private activatedRoute: ActivatedRoute, public dialogService: DialogService, private renderer: Renderer2) { }

  ngOnInit(): void {
    



  }

  ngAfterViewInit() {
    if (this.demo) {
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
            _id: 1,
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

    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['stockId'];
      if (id) {
        this.stockId = id;
        this.fetchStockDetails();
      } else {
        this.router.navigate(["search"])
      }
    });
  }

  async fetchStockDetails() {
    if (this.demo) {
      this.setActionText();
      this.defineActiveOperations();
      this.setChart();
      this.loaded = true;
    } else {
      try {
        let response = await this.stocksService.getStockDetails({ stockCode: this.stockId });
        console.log(response);
        this.stockDetails = response as StockDetailsData;
        this.setActionText();
        this.defineActiveOperations();
        this.setChart();
        this.loaded = true;
      } catch (err) {
        console.log(err);
        this.loaded = true;
      }
    }
    
  }

  defineActiveOperations() {
    for (let operation of this.stockDetails.myOperations) {
      if (operation.status === 'active') {
        this.activeOperations.push(operation);
      }
    }
  }

  setActionText() {
    if (this.stockDetails.typeOfPrediction === 'positive') {
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
      if (operation !== undefined || operation !== null) {
        this.buyStocks(operation)
      }
    });
  }

  async buyStocks(operation: Operation) {
    if (!this.demo) {
      try {
        let newOperation: any = this.stocksService.buyStocks(operation);
        this.stockDetails.myOperations.push(newOperation as Operation);
      } catch (err) {
        console.log(err)
      }
    }
  }

  sellActions() {
    const ref = this.dialogService.open(SelectOperationPopupComponent, {
      header: 'Elige la operación a vender',
      width: '70%',
      data: this.activeOperations,
    });
    ref.onClose.subscribe((operation) => {
      if (operation !== undefined || operation !== null) {
        this.sellStocks(operation);
      }
    });
  }

  async sellStocks(operation: Operation) {
    if (!this.demo) {
      try {
        let response = this.stocksService.sellStocks(operation);
        for (let [index, history] of this.stockDetails.myOperations.entries()) {
          if (history._id === operation._id) {
            this.stockDetails.myOperations.splice(index, 1);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  createDateString() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10) {
      return `${day}-0${month}-${year}`
    } else {
      return `${day}-${month}-${year}`
    }
  }

  setChart() {
    let chartElement = this.renderer.createElement('div');


    this.chart = createChart(chartElement, {
      width: this.graph.nativeElement.offsetWidth,
      height: this.graph.nativeElement.offsetHeight,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
    });
    this.renderer.appendChild(this.graph.nativeElement, chartElement);

    let areaSeries = this.chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.56)',
      bottomColor: 'rgba(33, 150, 243, 0.04)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
    });

    let darkTheme = {
      chart: {
        layout: {
          backgroundColor: '#2B2B43',
          lineColor: '#2B2B43',
          textColor: '#D9D9D9',
        },
        watermark: {
          color: 'rgba(0, 0, 0, 0)',
        },
        crosshair: {
          color: '#758696',
        },
        grid: {
          vertLines: {
            color: '#2B2B43',
          },
          horzLines: {
            color: '#363C4E',
          },
        },
      },
      series: {
        topColor: 'rgba(32, 226, 47, 0.56)',
        bottomColor: 'rgba(32, 226, 47, 0.04)',
        lineColor: 'rgba(32, 226, 47, 1)',
      },
    };

    this.chart.applyOptions(darkTheme.chart as any);
    areaSeries.applyOptions(darkTheme.series);
    areaSeries.setData(this.stockDetails.graphData);
    // areaSeries.setData([
    //   { date: '2018-10-19', close: 35.98 },
    //   { date: '2018-10-22', close: 35.75 },
    //   { date: '2018-10-23', close: 35.65 },
    //   { date: '2018-10-24', close: 34.12 },
    //   { date: '2018-10-25', close: 35.84 },
    //   { date: '2018-10-26', close: 35.24 },
    //   { date: '2018-10-29', close: 35.99 },
    //   { date: '2018-10-30', close: 37.71 },
    //   { date: '2018-10-31', close: 38.14 },
    //   { date: '2018-11-01', close: 37.95 },
    //   { date: '2018-11-02', close: 37.66 },
    //   { date: '2018-11-05', close: 38.02 },
    //   { date: '2018-11-06', close: 37.73 },
    //   { date: '2018-11-07', close: 38.30 },
    //   { date: '2018-11-08', close: 38.30 },
    //   { date: '2018-11-09', close: 38.34 },
    //   { date: '2018-11-12', close: 38.00 },
    //   { date: '2018-11-13', close: 37.72 },
    //   { date: '2018-11-14', close: 38.29 },
    //   { date: '2018-11-15', close: 38.49 },
    //   { date: '2018-11-16', close: 38.59 },
    //   { date: '2018-11-19', close: 38.18 },
    //   { date: '2018-11-20', close: 36.76 },
    //   { date: '2018-11-21', close: 37.51 },
    //   { date: '2018-11-23', close: 37.39 },
    //   { date: '2018-11-26', close: 37.77 },
    //   { date: '2018-11-27', close: 38.36 },
    //   { date: '2018-11-28', close: 39.06 },
    //   { date: '2018-11-29', close: 39.42 },
    //   { date: '2018-11-30', close: 39.01 },
    //   { date: '2018-12-03', close: 39.15 },
    //   { date: '2018-12-04', close: 37.69 },
    //   { date: '2018-12-06', close: 37.88 },
    //   { date: '2018-12-07', close: 37.41 },
    //   { date: '2018-12-10', close: 37.35 },
    //   { date: '2018-12-11', close: 36.84 },
    //   { date: '2018-12-12', close: 36.98 },
    //   { date: '2018-12-13', close: 36.76 },
    //   { date: '2018-12-14', close: 36.34 },
    //   { date: '2018-12-17', close: 36.21 },
    //   { date: '2018-12-18', close: 35.65 },
    //   { date: '2018-12-19', close: 35.19 },
    //   { date: '2018-12-20', close: 34.62 },
    //   { date: '2018-12-21', close: 33.75 },
    //   { date: '2018-12-24', close: 33.07 },
    //   { date: '2018-12-26', close: 34.14 },
    //   { date: '2018-12-27', close: 34.47 },
    //   { date: '2018-12-28', close: 34.35 },
    //   { date: '2018-12-31', close: 34.05 },
    //   { date: '2019-01-02', close: 34.37 },
    //   { date: '2019-01-03', close: 34.64 },
    //   { date: '2019-01-04', close: 35.81 },
    //   { date: '2019-01-07', close: 35.43 },
    //   { date: '2019-01-08', close: 35.72 },
    //   { date: '2019-01-09', close: 36.06 },
    //   { date: '2019-01-10', close: 35.82 },
    //   { date: '2019-01-11', close: 35.63 },
    //   { date: '2019-01-14', close: 35.77 },
    //   { date: '2019-01-15', close: 35.83 },
    //   { date: '2019-01-16', close: 35.90 },
    //   { date: '2019-01-17', close: 35.91 },
    //   { date: '2019-01-18', close: 36.21 },
    //   { date: '2019-01-22', close: 34.97 },
    //   { date: '2019-01-23', close: 36.89 },
    //   { date: '2019-01-24', close: 36.24 },
    //   { date: '2019-01-25', close: 35.78 },
    //   { date: '2019-01-28', close: 35.37 },
    //   { date: '2019-01-29', close: 36.08 },
    //   { date: '2019-01-30', close: 35.43 },
    //   { date: '2019-01-31', close: 36.57 },
    //   { date: '2019-02-01', close: 36.79 },
    //   { date: '2019-02-04', close: 36.77 },
    //   { date: '2019-02-05', close: 37.15 },
    //   { date: '2019-02-06', close: 37.17 },
    //   { date: '2019-02-07', close: 37.68 },
    //   { date: '2019-02-08', close: 37.60 },
    //   { date: '2019-02-11', close: 37.00 },
    //   { date: '2019-02-12', close: 37.24 },
    //   { date: '2019-02-13', close: 37.03 },
    //   { date: '2019-02-14', close: 37.26 },
    //   { date: '2019-02-15', close: 37.77 },
    //   { date: '2019-02-19', close: 37.55 },
    //   { date: '2019-02-20', close: 37.79 },
    //   { date: '2019-02-21', close: 38.47 },
    //   { date: '2019-02-22', close: 38.61 },
    //   { date: '2019-02-25', close: 38.57 },
    //   { date: '2019-02-26', close: 38.80 },
    //   { date: '2019-02-27', close: 38.53 },
    //   { date: '2019-02-28', close: 38.67 },
    //   { date: '2019-03-01', close: 39.10 },
    //   { date: '2019-03-04', close: 38.73 },
    //   { date: '2019-03-05', close: 38.72 },
    //   { date: '2019-03-06', close: 38.61 },
    //   { date: '2019-03-07', close: 38.38 },
    //   { date: '2019-03-08', close: 38.19 },
    //   { date: '2019-03-11', close: 39.17 },
    //   { date: '2019-03-12', close: 39.49 },
    //   { date: '2019-03-13', close: 39.56 },
    //   { date: '2019-03-14', close: 39.87 },
    //   { date: '2019-03-15', close: 40.47 },
    //   { date: '2019-03-18', close: 39.92 },
    //   { date: '2019-03-19', close: 39.78 },
    //   { date: '2019-03-20', close: 39.47 },
    //   { date: '2019-03-21', close: 40.05 },
    //   { date: '2019-03-22', close: 39.46 },
    //   { date: '2019-03-25', close: 39.18 },
    //   { date: '2019-03-26', close: 39.63 },
    //   { date: '2019-03-27', close: 40.21 },
    //   { date: '2019-03-28', close: 40.42 },
    //   { date: '2019-03-29', close: 39.98 },
    //   { date: '2019-04-01', close: 40.31 },
    //   { date: '2019-04-02', close: 40.02 },
    //   { date: '2019-04-03', close: 40.27 },
    //   { date: '2019-04-04', close: 40.41 },
    //   { date: '2019-04-05', close: 40.42 },
    //   { date: '2019-04-08', close: 40.71 },
    //   { date: '2019-04-09', close: 41.04 },
    //   { date: '2019-04-10', close: 41.08 },
    //   { date: '2019-04-11', close: 41.04 },
    //   { date: '2019-04-12', close: 41.30 },
    //   { date: '2019-04-15', close: 41.78 },
    //   { date: '2019-04-16', close: 41.97 },
    //   { date: '2019-04-17', close: 42.57 },
    //   { date: '2019-04-18', close: 42.43 },
    //   { date: '2019-04-22', close: 42.00 },
    //   { date: '2019-04-23', close: 41.99 },
    //   { date: '2019-04-24', close: 41.85 },
    //   { date: '2019-04-25', close: 42.93 },
    //   { date: '2019-04-26', close: 43.08 },
    //   { date: '2019-04-29', close: 43.45 },
    //   { date: '2019-04-30', close: 43.53 },
    //   { date: '2019-05-01', close: 43.42 },
    //   { date: '2019-05-02', close: 42.65 },
    //   { date: '2019-05-03', close: 43.29 },
    //   { date: '2019-05-06', close: 43.30 },
    //   { date: '2019-05-07', close: 42.76 },
    //   { date: '2019-05-08', close: 42.55 },
    //   { date: '2019-05-09', close: 42.92 },
    //   { date: '2019-05-10', close: 43.15 },
    //   { date: '2019-05-13', close: 42.28 },
    //   { date: '2019-05-14', close: 42.91 },
    //   { date: '2019-05-15', close: 42.49 },
    //   { date: '2019-05-16', close: 43.19 },
    //   { date: '2019-05-17', close: 43.54 },
    //   { date: '2019-05-20', close: 42.78 },
    //   { date: '2019-05-21', close: 43.29 },
    //   { date: '2019-05-22', close: 43.30 },
    //   { date: '2019-05-23', close: 42.73 },
    //   { date: '2019-05-24', close: 42.67 },
    //   { date: '2019-05-28', close: 42.75 },
    // ]);
  }

  onResize(event) {
    console.log('resize')
    this.chart.applyOptions({ width: this.graph.nativeElement.offsetWidth })
  }

}
