import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { AdminService } from '../services/admin.service';

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
  keyRole : string = 'user'; // Default role for key generation

  // CAPTCHA (optional)
  captchaCode: string = '';
  userCaptcha: string = '';
  captchaStatus: 'valid' | 'invalid' | '' = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}


 

  ngOnInit(): void {
    this.generateCaptcha();

    this.route.queryParams.subscribe(params => {
      const role = params['role'];
      if (role === 'admin' || role === 'user') {
        this.loginRole = role as 'user' | 'admin';
        console.log('Selected role from query params:', this.loginRole);
        this.selectRole(role);
      }
    });
  }

  selectRole(role: 'user' | 'admin') {
    this.loginRole = role;
    this.loginEmail = '';
    this.loginPassword = '';
    this.userCaptcha = '';
    this.captchaStatus = '';
    this.loginMessage = '';
    this.generateCaptcha();

    if (role === 'admin') {
      this.router.navigate([], { queryParams: { role: 'admin' } });
    }
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
    // ✅ Basic validation
    if (!this.loginEmail || this.loginPassword.length < 6) {
      this.loginMessage = 'Enter a valid email and password (min 6 characters)';
      this.loginMessageColor = 'danger';
      return;
    }

    if (this.loginRole === 'admin') {
    this.router.navigate(['/admin-card']);
  } else if (this.loginRole === 'user') {
    this.router.navigate(['/user-dashboard']); // <-- update path as per your routing setup
  }

  this.loginMessage = `Logged in as ${this.loginRole}`;
  this.loginMessageColor = 'success';





    // const loginPayload = {
    //   email: this.loginEmail,
    //   password: this.loginPassword
      
    // };

    // ✅ Call Admin Login API
    // if (this.loginRole === 'admin') {
    //   this.adminService.login(loginPayload).subscribe({
    //     next: (res: any) => {
    //       this.loginMessage = res.message || 'Admin login successful';
    //       this.loginMessageColor = 'success';
    //       alert('Admin login successful');
    //       this.router.navigate(['/admin-card']);
    //     },
    //     error: (err) => {
    //       console.error('Login Error:', err);
    //       this.loginMessage = err.error || 'Admin login failed';
    //       this.loginMessageColor = 'danger';
    //     }
    //   });
    // } else {
    //   alert('User login not implemented yet.');
    //   this.loginMessage = 'User login is not yet implemented.';
    //   this.loginMessageColor = 'danger';
    // }
  }
}
