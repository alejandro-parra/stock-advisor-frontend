import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
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
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
