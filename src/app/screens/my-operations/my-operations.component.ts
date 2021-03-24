import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MyOperationsData, Operation } from 'src/app/interfaces/MyOperations';
import { StocksService } from 'src/app/services/stocks-service';

@Component({
  selector: 'app-my-operations',
  templateUrl: './my-operations.component.html',
  styleUrls: ['./my-operations.component.scss']
})
export class MyOperationsComponent implements OnInit {
  loaded = false;
  myOperations: MyOperationsData;

  //tab navigation variables
  items: MenuItem[];
  activeItem: MenuItem;


  constructor(private router: Router, private stocksService: StocksService) { }

  ngOnInit(): void {
    this.setupUI();
    this.fetchMyOperationData();
  }

  async fetchMyOperationData() {
    try {
      let response: any = await this.stocksService.getMyOperations({});
      this.myOperations = response as MyOperationsData;
      this.loaded = true;
    } catch (err) {
      this.loaded = true;
    }
  }

  setupUI() {
    this.items = [
      {
        label: 'Activas', id: '0',
        command: () => {
          this.activeItem = this.items[0]
        }
      },
      {
        label: 'Cerradas', id: '1',
        command: () => {
          this.activeItem = this.items[1]
        }
      }
    ];
    this.activeItem = this.items[0];
  }

  navigateStockDetails(operation: Operation) {
    this.router.navigate(['stockdetails'], { queryParams: { stockId: operation.stockCode } });
  }



}
