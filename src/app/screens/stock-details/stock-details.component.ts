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
  loaded = true;
  actionText = "comprar";
  activeOperations: Operation[] = [];
  chart: any
  @ViewChild('graphContainer') graph: ElementRef;

  constructor(private router: Router, private stocksService: StocksService, private activatedRoute: ActivatedRoute, public dialogService: DialogService, private renderer: Renderer2) { }

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

  ngAfterViewInit () {
    this.setChart();
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

    areaSeries.setData([
      { time: '2018-10-19', value: 35.98 },
      { time: '2018-10-22', value: 35.75 },
      { time: '2018-10-23', value: 35.65 },
      { time: '2018-10-24', value: 34.12 },
      { time: '2018-10-25', value: 35.84 },
      { time: '2018-10-26', value: 35.24 },
      { time: '2018-10-29', value: 35.99 },
      { time: '2018-10-30', value: 37.71 },
      { time: '2018-10-31', value: 38.14 },
      { time: '2018-11-01', value: 37.95 },
      { time: '2018-11-02', value: 37.66 },
      { time: '2018-11-05', value: 38.02 },
      { time: '2018-11-06', value: 37.73 },
      { time: '2018-11-07', value: 38.30 },
      { time: '2018-11-08', value: 38.30 },
      { time: '2018-11-09', value: 38.34 },
      { time: '2018-11-12', value: 38.00 },
      { time: '2018-11-13', value: 37.72 },
      { time: '2018-11-14', value: 38.29 },
      { time: '2018-11-15', value: 38.49 },
      { time: '2018-11-16', value: 38.59 },
      { time: '2018-11-19', value: 38.18 },
      { time: '2018-11-20', value: 36.76 },
      { time: '2018-11-21', value: 37.51 },
      { time: '2018-11-23', value: 37.39 },
      { time: '2018-11-26', value: 37.77 },
      { time: '2018-11-27', value: 38.36 },
      { time: '2018-11-28', value: 39.06 },
      { time: '2018-11-29', value: 39.42 },
      { time: '2018-11-30', value: 39.01 },
      { time: '2018-12-03', value: 39.15 },
      { time: '2018-12-04', value: 37.69 },
      { time: '2018-12-06', value: 37.88 },
      { time: '2018-12-07', value: 37.41 },
      { time: '2018-12-10', value: 37.35 },
      { time: '2018-12-11', value: 36.84 },
      { time: '2018-12-12', value: 36.98 },
      { time: '2018-12-13', value: 36.76 },
      { time: '2018-12-14', value: 36.34 },
      { time: '2018-12-17', value: 36.21 },
      { time: '2018-12-18', value: 35.65 },
      { time: '2018-12-19', value: 35.19 },
      { time: '2018-12-20', value: 34.62 },
      { time: '2018-12-21', value: 33.75 },
      { time: '2018-12-24', value: 33.07 },
      { time: '2018-12-26', value: 34.14 },
      { time: '2018-12-27', value: 34.47 },
      { time: '2018-12-28', value: 34.35 },
      { time: '2018-12-31', value: 34.05 },
      { time: '2019-01-02', value: 34.37 },
      { time: '2019-01-03', value: 34.64 },
      { time: '2019-01-04', value: 35.81 },
      { time: '2019-01-07', value: 35.43 },
      { time: '2019-01-08', value: 35.72 },
      { time: '2019-01-09', value: 36.06 },
      { time: '2019-01-10', value: 35.82 },
      { time: '2019-01-11', value: 35.63 },
      { time: '2019-01-14', value: 35.77 },
      { time: '2019-01-15', value: 35.83 },
      { time: '2019-01-16', value: 35.90 },
      { time: '2019-01-17', value: 35.91 },
      { time: '2019-01-18', value: 36.21 },
      { time: '2019-01-22', value: 34.97 },
      { time: '2019-01-23', value: 36.89 },
      { time: '2019-01-24', value: 36.24 },
      { time: '2019-01-25', value: 35.78 },
      { time: '2019-01-28', value: 35.37 },
      { time: '2019-01-29', value: 36.08 },
      { time: '2019-01-30', value: 35.43 },
      { time: '2019-01-31', value: 36.57 },
      { time: '2019-02-01', value: 36.79 },
      { time: '2019-02-04', value: 36.77 },
      { time: '2019-02-05', value: 37.15 },
      { time: '2019-02-06', value: 37.17 },
      { time: '2019-02-07', value: 37.68 },
      { time: '2019-02-08', value: 37.60 },
      { time: '2019-02-11', value: 37.00 },
      { time: '2019-02-12', value: 37.24 },
      { time: '2019-02-13', value: 37.03 },
      { time: '2019-02-14', value: 37.26 },
      { time: '2019-02-15', value: 37.77 },
      { time: '2019-02-19', value: 37.55 },
      { time: '2019-02-20', value: 37.79 },
      { time: '2019-02-21', value: 38.47 },
      { time: '2019-02-22', value: 38.61 },
      { time: '2019-02-25', value: 38.57 },
      { time: '2019-02-26', value: 38.80 },
      { time: '2019-02-27', value: 38.53 },
      { time: '2019-02-28', value: 38.67 },
      { time: '2019-03-01', value: 39.10 },
      { time: '2019-03-04', value: 38.73 },
      { time: '2019-03-05', value: 38.72 },
      { time: '2019-03-06', value: 38.61 },
      { time: '2019-03-07', value: 38.38 },
      { time: '2019-03-08', value: 38.19 },
      { time: '2019-03-11', value: 39.17 },
      { time: '2019-03-12', value: 39.49 },
      { time: '2019-03-13', value: 39.56 },
      { time: '2019-03-14', value: 39.87 },
      { time: '2019-03-15', value: 40.47 },
      { time: '2019-03-18', value: 39.92 },
      { time: '2019-03-19', value: 39.78 },
      { time: '2019-03-20', value: 39.47 },
      { time: '2019-03-21', value: 40.05 },
      { time: '2019-03-22', value: 39.46 },
      { time: '2019-03-25', value: 39.18 },
      { time: '2019-03-26', value: 39.63 },
      { time: '2019-03-27', value: 40.21 },
      { time: '2019-03-28', value: 40.42 },
      { time: '2019-03-29', value: 39.98 },
      { time: '2019-04-01', value: 40.31 },
      { time: '2019-04-02', value: 40.02 },
      { time: '2019-04-03', value: 40.27 },
      { time: '2019-04-04', value: 40.41 },
      { time: '2019-04-05', value: 40.42 },
      { time: '2019-04-08', value: 40.71 },
      { time: '2019-04-09', value: 41.04 },
      { time: '2019-04-10', value: 41.08 },
      { time: '2019-04-11', value: 41.04 },
      { time: '2019-04-12', value: 41.30 },
      { time: '2019-04-15', value: 41.78 },
      { time: '2019-04-16', value: 41.97 },
      { time: '2019-04-17', value: 42.57 },
      { time: '2019-04-18', value: 42.43 },
      { time: '2019-04-22', value: 42.00 },
      { time: '2019-04-23', value: 41.99 },
      { time: '2019-04-24', value: 41.85 },
      { time: '2019-04-25', value: 42.93 },
      { time: '2019-04-26', value: 43.08 },
      { time: '2019-04-29', value: 43.45 },
      { time: '2019-04-30', value: 43.53 },
      { time: '2019-05-01', value: 43.42 },
      { time: '2019-05-02', value: 42.65 },
      { time: '2019-05-03', value: 43.29 },
      { time: '2019-05-06', value: 43.30 },
      { time: '2019-05-07', value: 42.76 },
      { time: '2019-05-08', value: 42.55 },
      { time: '2019-05-09', value: 42.92 },
      { time: '2019-05-10', value: 43.15 },
      { time: '2019-05-13', value: 42.28 },
      { time: '2019-05-14', value: 42.91 },
      { time: '2019-05-15', value: 42.49 },
      { time: '2019-05-16', value: 43.19 },
      { time: '2019-05-17', value: 43.54 },
      { time: '2019-05-20', value: 42.78 },
      { time: '2019-05-21', value: 43.29 },
      { time: '2019-05-22', value: 43.30 },
      { time: '2019-05-23', value: 42.73 },
      { time: '2019-05-24', value: 42.67 },
      { time: '2019-05-28', value: 42.75 },
    ]);
  }

  onResize(event) {
    console.log('resize')
    this.chart.applyOptions({ width: this.graph.nativeElement.offsetWidth })
  }

}
