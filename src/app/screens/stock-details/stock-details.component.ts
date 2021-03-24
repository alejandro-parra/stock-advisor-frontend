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
  chart: any;
  areaSeries: any;
  @ViewChild('graphContainer') graph: ElementRef;

  constructor(private router: Router, private stocksService: StocksService, private activatedRoute: ActivatedRoute, public dialogService: DialogService, private renderer: Renderer2) { }

  ngOnInit(): void {
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

  ngAfterViewInit() {
  }

  async fetchStockDetails() {
    try {
      let response = await this.stocksService.getStockDetails({ stockCode: this.stockId });
      this.stockDetails = response as StockDetailsData;
      this.setActionText();
      this.orderOperationsByStatus();
      this.defineActiveOperations();
      this.setChart();
      this.loaded = true;
    } catch (err) {
      this.loaded = true;
    }
  }

  defineActiveOperations() {
    let newOperations = [];
    for (let operation of this.stockDetails.myOperations) {
      if (operation.status === 'active') {
        newOperations.push(operation);
      }
    }
    this.activeOperations = newOperations;
  }

  orderOperationsByStatus() {
    this.stockDetails.myOperations.sort((a,b) => {
      if(a.status === 'active') {
        return -1;
      } else {
        return 1;
      }
    })
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
        companyImg: this.stockDetails.companyImage,
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
    try {
      let newOperation = await this.stocksService.buyStocks(operation);
      this.stockDetails.myOperations.push(newOperation as Operation);
      this.orderOperationsByStatus();
      this.defineActiveOperations();
    } catch (err) {
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
    try {
      let response = await this.stocksService.sellStocks(operation);
      for (let [index, history] of this.stockDetails.myOperations.entries()) {
        if (history._id === operation._id) {
          this.stockDetails.myOperations[index].status = 'closed';
          this.stockDetails.myOperations[index].closingDate = this.createDateString();
          this.stockDetails.myOperations[index].closingPrice = this.stockDetails.actualPrice;
          this.orderOperationsByStatus();
          this.defineActiveOperations();
        }
      }
    } catch (err) {
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

    let min = this.stockDetails.graphData.reduce(function(prev, curr) {
      return prev.value < curr.value ? prev : curr;
    });

    let max = this.stockDetails.graphData.reduce(function(prev, curr) {
      return prev.value > curr.value ? prev : curr;
    });
    this.areaSeries = this.chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.56)',
      bottomColor: 'rgba(33, 150, 243, 0.04)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2
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
    this.areaSeries.applyOptions(darkTheme.series);
    this.areaSeries.setData(this.stockDetails.graphData.reverse());
  }

  loadGraphData() {
    this.chart.removeSeries(this.areaSeries);
    this.areaSeries.setData(this.stockDetails.graphData.reverse());
    this.chart.addAreaSeries(this.areaSeries);
  }

  onResize(event) {
    this.chart.applyOptions({ width: this.graph.nativeElement.offsetWidth })
  }

}
