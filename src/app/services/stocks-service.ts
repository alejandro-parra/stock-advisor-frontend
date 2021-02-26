import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalsAlertsService } from './modals-alert-service';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  //Authenticated observable, starting value is false
  public authState = new BehaviorSubject(false);
  public userInfo: any = null;

  constructor(private router: Router, private http: HttpClient, private modalsAlertsService:ModalsAlertsService, private userService: UserService) {
  }

  ngOnInit() {
  }

  logout(){
    //put all the publishSubjects to null
  }

  

}
