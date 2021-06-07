import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule} from 'primeng/password';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { ScrollPanelModule} from 'primeng/scrollpanel';
import { TableModule} from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './screens/login/login.component';
import { NavbarComponent } from './screens/navbar/navbar.component';
import { StockSearchComponent } from './screens/stock-search/stock-search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenubarModule} from 'primeng/menubar';
import { LoadingOverlayComponent } from './screens/loading-overlay/loading-overlay.component';
import { StockDetailsComponent } from './screens/stock-details/stock-details.component';
import { MyOperationsComponent } from './screens/my-operations/my-operations.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmPurchasePopupComponent } from './screens/confirm-purchase-popup/confirm-purchase-popup.component';
import { SelectOperationPopupComponent } from './screens/select-operation-popup/select-operation-popup.component';
import {MenuItem} from 'primeng/api';
import { CardGameComponent } from './screens/card-game/card-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    StockSearchComponent,
    LoadingOverlayComponent,
    StockDetailsComponent,
    MyOperationsComponent,
    ConfirmPurchasePopupComponent,
    SelectOperationPopupComponent,
    CardGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PasswordModule,
    TabMenuModule,
    StepsModule,
    ScrollPanelModule,
    TableModule,
    BadgeModule,
    ToastModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ProgressSpinnerModule
  ],
  entryComponents: [
    
  ],
  providers: [ConfirmationService, MessageService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
