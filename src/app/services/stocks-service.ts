import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalsAlertsService } from './modals-alert-service';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  //Authenticated observable, starting value is false
  public authState = new BehaviorSubject(false);
  public userInfo: any = null;
  url = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient, private modalsAlertsService: ModalsAlertsService, public userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    //put all the publishSubjects to null
  }

  searchStocks(data) {
    return new Promise(async (resolve, reject) => {
      if(!this.userService.userInfo){
        return reject("No user logged in");
      }
      data.userId = this.userService.userInfo.id
      let headers_object = new HttpHeaders().set("access-token", this.userService.userInfo.token);
      this.http.post(this.url + '/search-stock', data, { headers: headers_object }).subscribe((response: any) => {
        if (response) {
          resolve(response)
        }
      }, (error) => {
        if (error.status != 200) {
          this.modalsAlertsService.openErrorToast("Error código " + error.status, error.error.error)
          reject(error)
        }
      })
    });
  }

  getStockDetails(data) {
    return new Promise(async (resolve, reject) => {
      if(!this.userService.userInfo){
        return reject("No user logged in");
      }
      data.userId = this.userService.userInfo.id
      let headers_object = new HttpHeaders().set("access-token", this.userService.userInfo.token);
      this.http.post(this.url + '/get-stock-details', data, { headers: headers_object }).subscribe((response: any) => {
        if (response) {
          resolve(response)
        }
      }, (error) => {
        if (error.status != 200) {
          this.modalsAlertsService.openErrorToast("Error código " + error.status, error.error.error)
          this.router.navigate(['search']);
          reject(error)
        }
      })
    });
  }

  buyStocks(data) {
    return new Promise(async (resolve, reject) => {
      if(!this.userService.userInfo){
        return reject("No user logged in");
      }
      data.userId = this.userService.userInfo.id
      let headers_object = new HttpHeaders().set("access-token", this.userService.userInfo.token);
      this.http.post(this.url + '/buy-stock', data, { headers: headers_object }).subscribe((response: any) => {
        if (response) {
          this.modalsAlertsService.openConfirmationToast("Compra exitosa", `Ya tienes tus operaciones en ${response.stockName}`);
          resolve(response)
        }
      }, (error) => {
        if (error.status != 200) {
          this.modalsAlertsService.openErrorToast("Error código " + error.status, error.error.error)
          reject(error)
        }
      })
    });
  }

  sellStocks(data) {
    return new Promise(async (resolve, reject) => {
      if(!this.userService.userInfo){
        return reject("No user logged in");
      }
      data.userId = this.userService.userInfo.id
      let headers_object = new HttpHeaders().set("access-token", this.userService.userInfo.token);
      this.http.post(this.url + '/sell-stock', data, { headers: headers_object }).subscribe((response: any) => {
        if (response) {
          this.modalsAlertsService.openConfirmationToast("Venta exitosa", `Operación cerrada exitosamente`);
          resolve(response)
        }
      }, (error) => {
        if (error.status != 200) {
          this.modalsAlertsService.openErrorToast("Error código " + error.status, error.error.error)
          reject(error)
        } else {
          this.modalsAlertsService.openConfirmationToast("Venta exitosa", `Operación cerrada exitosamente`);
          resolve('success')
        }
      })
    });
  }

  getMyOperations(data) {
    return new Promise(async (resolve, reject) => {
      if(!this.userService.userInfo){
        return reject("No user logged in");
      }
      data.userId = this.userService.userInfo.id
      let headers_object = new HttpHeaders().set("access-token", this.userService.userInfo.token);
      this.http.post(this.url + '/my-operations', data, { headers: headers_object }).subscribe((response: any) => {
        if (response) {
          resolve(response)
        }
      }, (error) => {
        if (error.status != 200) {
          this.modalsAlertsService.openErrorToast("Error código " + error.status, error.error.error)
          this.router.navigate(['search']);
          reject(error)
        }
      })
    });
  }
}
