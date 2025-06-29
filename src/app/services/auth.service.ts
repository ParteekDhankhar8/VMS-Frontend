import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private role: 'user' | 'admin' | null = null;

  login(role: 'user' | 'admin') {
    this.loggedIn = true;
    this.role = role;
    localStorage.setItem('authRole', role);
  }

  logout() {
    this.loggedIn = false;
    this.role = null;
    localStorage.removeItem('authRole');
    alert('You have been logged out successfully.');
    // Redirect to login and prevent back navigation
    // window.location.replace('');
  }
  isAuthenticated(): boolean {
    return this.loggedIn || !!localStorage.getItem('authRole');
  }

  getRole(): 'user' | 'admin' | null {
    return this.role || (localStorage.getItem('authRole') as 'user' | 'admin' | null);
  }
}
