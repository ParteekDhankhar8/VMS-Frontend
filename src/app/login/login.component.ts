// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   loginRole: 'user' | 'admin' = 'user';  
//   loginEmail: string = '';
//   loginPassword: string = '';
//   loginMessage: string = '';
//   loginMessageColor: 'success' | 'danger' = 'success';
//   keyRole : string = 'user'; 

 
//   captchaCode: string = '';
//   userCaptcha: string = '';
//   captchaStatus: 'valid' | 'invalid' | '' = '';

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//   ) {}


 

//   ngOnInit(): void {
//     this.generateCaptcha();

//     this.route.queryParams.subscribe(params => {
//       const role = params['role'];
//       if (role === 'admin' || role === 'user') {
//         this.loginRole = role as 'user' | 'admin';
//         console.log('Selected role from query params:', this.loginRole);
//         this.selectRole(role);
//       }
//     });
//   }

//   selectRole(role: 'user' | 'admin') {
//     this.loginRole = role;
//     this.loginEmail = '';
//     this.loginPassword = '';
//     this.userCaptcha = '';
//     this.captchaStatus = '';
//     this.loginMessage = '';
//     this.generateCaptcha();

//     if (role === 'admin') {
//       this.router.navigate([], { queryParams: { role: 'admin' } });
//     }
//   }

//   generateCaptcha(): void {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     this.captchaCode = Array.from({ length: 6 }, () =>
//       chars[Math.floor(Math.random() * chars.length)]
//     ).join('');
//     this.userCaptcha = '';
//     this.captchaStatus = '';
//   }

//   verifyCaptcha(): void {
//     this.captchaStatus = (this.userCaptcha.toUpperCase() === this.captchaCode)
//       ? 'valid'
//       : 'invalid';
//   }

//   onLogin(): void {
   
//     if (!this.loginEmail || this.loginPassword.length < 6) {
//       this.loginMessage = 'Enter a valid email and password (min 6 characters)';
//       this.loginMessageColor = 'danger';
//       return;
//     }

//     if (this.loginRole === 'admin') {

//     this.router.navigate(['/admin-card']);
//     this.router.navigate(['/admin-dashboard']); 
//   } else if (this.loginRole === 'user') {
//     this.router.navigate(['/user-dashboard']); 
//   }

//   this.loginMessage = `Logged in as ${this.loginRole}`;
//   this.loginMessageColor = 'success';
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRole: 'user' | 'admin' = 'user';  // Default to 'user'
  loginEmail: string = '';
  loginPassword: string = '';
  loginMessage: string = '';
  loginMessageColor: 'success' | 'danger' = 'success';
  keyRole: string = 'user'; // Optional: used for extra logic

  // CAPTCHA
  captchaCode: string = '';
  userCaptcha: string = '';
  captchaStatus: 'valid' | 'invalid' | '' = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();

    // Get ?role=admin or ?role=user from query params
    this.route.queryParams.subscribe(params => {
      const role = params['role']?.toLowerCase();
      if (role === 'admin' || role === 'user') {
        this.loginRole = role;
        console.log('Selected role from query params:', this.loginRole);
        // No need to call selectRole here unless you want to reset form
      }
    });
  }

  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.captchaCode = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    this.userCaptcha = '';
    this.captchaStatus = '';
  }

  verifyCaptcha(): void {
    this.captchaStatus = (this.userCaptcha.toUpperCase() === this.captchaCode)
      ? 'valid'
      : 'invalid';
  }

  onLogin(): void {
    // Simple validation
    if (!this.loginEmail || this.loginPassword.length < 6) {
      this.loginMessage = 'Enter a valid email and password (min 6 characters)';
      this.loginMessageColor = 'danger';
      return;
    }

    if (this.captchaStatus !== 'valid') {
      this.loginMessage = 'Please verify CAPTCHA before login';
      this.loginMessageColor = 'danger';
      return;
    }

    // Simulate login success
    this.authService.login(this.loginRole);  // Save role in AuthService

    if (this.loginRole === 'admin') {
      this.router.navigate(['/admin-dashboard']);  // or your desired admin page
    } else {
      this.router.navigate(['/user-dashboard']);  // or your desired user page
    }

    this.loginMessage = `Logged in as ${this.loginRole}`;
    this.loginMessageColor = 'success';
  }
}

