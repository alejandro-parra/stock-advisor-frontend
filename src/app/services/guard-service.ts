import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private userService: UserService,private router:Router) { }

  //Check if user is already logged in the application,if not user is returned to login page
  canActivate(): boolean {
    if(this.userService.isAuthenticated() == false){
      this.router.navigate(['login']);
    }
    return this.userService.isAuthenticated();
  }
}