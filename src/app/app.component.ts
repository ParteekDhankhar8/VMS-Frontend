import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VMS';
  constructor(public authService: AuthService, private router: Router, private location: Location) {}

  logout() {
    this.authService.logout();
    
    // Replace current history state and redirect to root
  this.location.replaceState('');

  // Navigate to homepage (or login)
  this.router.navigateByUrl('').then(() => {
    // Immediately trap back button
    setTimeout(() => {
      history.pushState(null, '', '');
      window.onpopstate = () => {
        history.pushState(null, '', '');
      };
    }, 0);
  });
  }
}
