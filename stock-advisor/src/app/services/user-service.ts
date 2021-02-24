import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalsAlertsService } from './modals-alert-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Authenticated observable, starting value is false
  public authState = new BehaviorSubject(false);
  public userInfo: any = null;

  constructor(private router: Router, private http: HttpClient, private modalsAlertsService:ModalsAlertsService) { 
  }


  ngOnInit() {
    this.ifLoggedIn();
  }

  /*
    Returns authenticated status
  */  
  isAuthenticated() {
    return this.authState.value;
  }

  /*
    Check if user is already logged in by checking local storage
  */
  ifLoggedIn() {
    let tempUser = localStorage.getItem('StockAdvisorUser')
    if (tempUser !== null) {
      this.userInfo = JSON.parse(tempUser)
      this.authState.next(true)
      this.validateToken().then((response)=>{
        console.log(response)
      },(reject)=>{
        this.logout()
      })
    }
  }

  /*
    Valisates JSON Web Token in the server, returns user to login if token is not valid
  */
 validateToken(){
  return new Promise(async (resolve,reject) => {
    let headers_object = new HttpHeaders().set("access-token", this.userInfo.token);  
      this.http.post('http://localhost:3000/validate-token', {}, { headers:headers_object, responseType: 'text' }).subscribe((response:any)=>{
        if(!response){
          this.authState.next(false);
          this.logout();
          reject('Logout')
        }else{
          resolve('Success')
        }
      },(error) => { 
        this.authState.next(false);
        this.logout();
        reject('Logout')
      })
    })
  }

  async register(data) {
    return new Promise(async resolve => {
      this.http.post('http://localhost:3000/register-user', data).subscribe((response:any)=>{
        if(response){
          console.log(response)
          let tempUser = {
            id: response.insertedId,
            token: response.token,
            name: data.name,
            email: data.email,
            lastName: data.lastName,
            operations: data.operations
          }
          this.userInfo = tempUser;
          localStorage.setItem('StockAdvisorUser',JSON.stringify(tempUser));
          this.authState.next(true);
          this.router.navigate(['search']);
          this.modalsAlertsService.openConfirmationToast("Éxito","Cuenta registrada con éxito")
          resolve('exito');
        }
      }, (error) => { 
        console.log(error)
        if(error.status == 200){
          this.modalsAlertsService.openConfirmationToast("Éxito","Cuenta registrada con éxito")
        }else{
          this.modalsAlertsService.openErrorToast("Error código " + error.status,error.error)
        }
        resolve('error');
      })
    })
  }
  async login(data: any) {
    return new Promise(async resolve => {
      this.http.post('http://localhost:3000/login-user', data).subscribe((response:any)=>{
        if(response){
          console.log(response)
          let tempUser = {
            id: response._id,
            token: response.token,
            name: response.name,
            email: response.email,
            lastName: response.lastName,
            operations: response.operations
          };
          this.userInfo = tempUser;
          localStorage.setItem('StockAdvisorUser',JSON.stringify(tempUser));
          this.authState.next(true);
          this.router.navigate(['search']);
          resolve('exito');
        }
      }, (error) => { 
        if(error.status != 200){
          this.modalsAlertsService.openErrorToast("Error código " + error.status,error.error)
        }
        resolve('error');
      })
    })
  }

  async logout(){
    return new Promise(async resolve => {
        localStorage.removeItem('StockAdvisorUser')
        this.router.navigate(['login'])
        this.userInfo = null
        this.authState.next(false)
        resolve("Success")
    })
  }

  async sendPasswordRecovery(data) {
    return new Promise(async resolve => {
      this.http.post('http://localhost:3000/send-recovery-token', data).subscribe((response:any)=>{
        if(response){
          console.log('exito')
          this.router.navigate(['login']);
          this.modalsAlertsService.openConfirmationToast("Éxito","Código enviado con éxito")
          resolve('exito');
        }
      }, (error) => { 
        console.log(error)
        if(error.status == 200){
          this.modalsAlertsService.openConfirmationToast("Éxito","Código enviado con éxito");
          this.router.navigate(['login']);
          resolve('exito');
        }else{
          this.modalsAlertsService.openErrorToast("Error código " + error.status,error.error)
        }
      })
    })
  }

  async updatePassword(data) {
    return new Promise(async resolve => {
      this.http.post('http://localhost:3000/reset-user-password', data).subscribe((response:any)=>{
        if(response){
          console.log('exito')
          this.router.navigate(['login']);
          this.modalsAlertsService.openConfirmationToast("Éxito","Contraseña cambiada con éxito")
          resolve('exito');
        }
      }, (error) => { 
        console.log(error)
        if(error.status == 200){
          this.modalsAlertsService.openConfirmationToast("Éxito","Contraseña cambiada con éxito")
          this.router.navigate(['login']);
          resolve('exito');
        }else{
          this.modalsAlertsService.openErrorToast("Error código " + error.status,error.error)
        }
        
      })
    })
  }

}
