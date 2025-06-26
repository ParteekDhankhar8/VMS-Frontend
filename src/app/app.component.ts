import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VMS';
  currentUser: any = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null;
  constructor(public authService: AuthService, private router: Router, private location: Location) {}
  
  ngOnInit() {
    this.isLoggedIn();
    // Check if user is logged in on component initialization
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null;
  }
   logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/']);
    // Optional: navigate to login or home
  }
   isLoggedIn(): boolean {
    return this.currentUser && Object.keys(this.currentUser).length > 0;
  }
}
