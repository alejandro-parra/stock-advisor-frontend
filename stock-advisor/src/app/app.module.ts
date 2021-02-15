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
import {PasswordModule} from 'primeng/password';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './screens/login/login.component';
import { NavbarComponent } from './screens/navbar/navbar.component';
import { StockSearchComponent } from './screens/stock-search/stock-search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    StockSearchComponent
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
    BrowserAnimationsModule
  ],
  entryComponents: [
    
  ],
  providers: [ConfirmationService, MessageService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
