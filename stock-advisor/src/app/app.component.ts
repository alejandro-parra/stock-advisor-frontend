import { Component } from '@angular/core';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stock Advisor';
  constructor(
    private userService: UserService,
  ){}

  ngOnInit() {
    this.userService.ifLoggedIn();
    let installPromptEvent;
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      installPromptEvent = event;
    });
  }
}
