import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router, public userService: UserService){ }
  ngOnInit(): void {
    this.items = [
      {label: 'Buscador', icon: 'pi pi-search', routerLink: ['/search']},
      {label: 'Mis Operaciones', icon: 'pi pi-fw pi-book', routerLink: ['/myoperations']}
    ];
    if(this.router.url === '/search') {
      this.activeItem = this.items[0];
    }
    else if(this.router.url === '/myoperations'){
      this.activeItem = this.items[1];
    }
  }
}
