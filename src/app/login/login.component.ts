import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service'
import { LoginPayload } from '../services/loginservice.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginRole: 'User' | 'Admin' = 'User';  // Default to 'user'
  loginEmail: string = '';
  loginPassword: string = '';
  registrationPassword: string = ''; // Set this value appropriately
  showPassword: boolean = false;
  loginMessage: string = '';
  loginMessageColor: 'success' | 'danger' = 'success';
 
  // CAPTCHA
  captchaCode: string = '';
  userCaptcha: string = '';
  captchaStatus: 'valid' | 'invalid' | '' = '';
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginserviceService // Inject the service
  ) {}
 
  ngOnInit(): void {
    this.generateCaptcha();
 
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      const role = params['role'];
      if (role === 'Admin' || role === 'User') {
        this.loginRole = role as 'User' | 'Admin';
        console.log('Selected role from query params:', this.loginRole);
        this.selectRole(role);
      }
    });
  }
 
  selectRole(role: 'User' | 'Admin') {
    this.loginRole = role;
    this.loginEmail = '';
    this.loginPassword = '';
    this.userCaptcha = '';
    this.captchaStatus = '';
    this.loginMessage = '';
    this.generateCaptcha();
 
    // Update URL query param without reload
    this.router.navigate([], { queryParams: { role } });
  }
 
  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.captchaCode = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('').toUpperCase(); // Ensure always uppercase
    this.userCaptcha = '';
    this.captchaStatus = '';
  }
  
  verifyCaptcha(): void {
    this.captchaStatus = (this.userCaptcha === this.captchaCode)
      ? 'valid'
      : 'invalid';
  }
 
  onLogin(): void {
    // Basic validations
    if (!this.loginEmail || this.loginPassword.length < 6) {
      this.loginMessage = 'Enter a valid email and password (min 6 characters)';
      this.loginMessageColor = 'danger';
      return;
    }
 
    if (this.captchaStatus !== 'valid') {
      this.loginMessage = 'Please enter valid CAPTCHA code.';
      this.loginMessageColor = 'danger';
      return;
    }
 
    const payload: LoginPayload = {
      email: this.loginEmail,
      password: this.loginPassword
    };
 
    if (this.loginRole === 'Admin') {
      // Call admin login API
      this.loginService.adminLogin(payload).subscribe({
        next: (res) => {
          console.log('Login Response:', res);
          this.loginMessage = res.message || 'Admin login successful';
          this.loginMessageColor = 'success';
          alert('Admin login successful');
          localStorage.setItem("currentUser",JSON.stringify(res));
          this.router.navigate(['/admin-dashboard']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('Login Error:', err);
          this.loginMessage = err.error?.message || 'Admin login failed';
          this.loginMessageColor = 'danger';
          this.generateCaptcha(); // Refresh captcha on error
        }
      });
    } else if (this.loginRole === 'User') {
      // Call user login API
      this.loginService.userLogin(payload).subscribe({
        next: (res) => {
          this.loginMessage = res.message || 'User login successful';
          this.loginMessageColor = 'success';
          alert('User login successful');
          localStorage.setItem("currentUser",JSON.stringify(res));
          this.router.navigate(['/user-dashboard']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('Login Error:', err);
          this.loginMessage = err.error?.message || 'User login failed';
          this.loginMessageColor = 'danger';
          this.generateCaptcha(); // Refresh captcha on error
        }
      });
    }
  }

  get showPasswordConstraints(): boolean {
   
    return (
      !!this.loginPassword &&
      this.loginPassword !== this.registrationPassword &&
      this.loginPassword.length > 0
    );
  }
}
