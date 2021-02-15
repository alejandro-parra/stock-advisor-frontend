import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class ModalsAlertsService {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService) { }

  openErrorDialog(message,header){
    this.confirmationService.confirm({
      header: header,
      message: message,
      accept: () => {
          //Actual logic to perform a confirmation
      },
      
    });
  }

  openConfirmationDialog(message,header,width){
    this.confirmationService.confirm({
      header: header,
      message: message,
      accept: () => {
          //Actual logic to perform a confirmation
      }
    });
  }

  openInformationDialog(message,header){
    this.confirmationService.confirm({
      header: header,
      message: message,
      accept: () => {
          //Actual logic to perform a confirmation
      }
    });
  }

  openErrorToast(summary,details) {
    this.messageService.add({severity:'error', summary:summary, detail:details});
  }

  openConfirmationToast(summary, details) {
    this.messageService.add({severity:'success', summary:summary, detail:details});
  }

  openDynamicDialog(component,header,props,width,height,className) {
    const ref = this.dialogService.open(component, {
      header: header,
      data: props,
      width:width,
      height:height,
      styleClass:className
    });
  }

}
