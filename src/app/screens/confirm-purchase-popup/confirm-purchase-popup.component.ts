import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Operation } from 'src/app/interfaces/MyOperations';

@Component({
  selector: 'app-confirm-purchase-popup',
  templateUrl: './confirm-purchase-popup.component.html',
  styleUrls: ['./confirm-purchase-popup.component.scss']
})
export class ConfirmPurchasePopupComponent implements OnInit {
  operation: Operation


  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.operation = this.config.data;
  }

  confirmPurchase() {
    this.ref.close(this.operation);
  }

}
