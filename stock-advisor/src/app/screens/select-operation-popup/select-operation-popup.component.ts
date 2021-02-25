import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Operation } from 'src/app/interfaces/MyOperations';

@Component({
  selector: 'app-select-operation-popup',
  templateUrl: './select-operation-popup.component.html',
  styleUrls: ['./select-operation-popup.component.scss']
})
export class SelectOperationPopupComponent implements OnInit {
  operationList: Operation[];
  
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.operationList = this.config.data;
  }

  pickOperation(operation: Operation) {
    this.ref.close(operation)
  }

}
