import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardGameComponent } from './screens/card-game/card-game.component';
import { LoginComponent } from './screens/login/login.component';
import { MyOperationsComponent } from './screens/my-operations/my-operations.component';
import { StockDetailsComponent } from './screens/stock-details/stock-details.component';
import { StockSearchComponent } from './screens/stock-search/stock-search.component';
import { GuardService as AuthGuard } from './services/guard-service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
    ]
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: StockSearchComponent,
    children: [
    ]
  },
  {
    path: 'myoperations',
    canActivate: [AuthGuard],
    component: MyOperationsComponent,
    children: [
    ]
  },
  {
    path: 'stockdetails',
    canActivate: [AuthGuard],
    component: StockDetailsComponent,
    children: [
    ]
  },{
    path: 'cards',
    component: CardGameComponent,
    children: [
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
