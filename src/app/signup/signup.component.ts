import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpServiceService, SignupData } from '../services/sign-up-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private signUpService: SignUpServiceService){}
  name = '';
  email = '';
  age ='';
  gender='';
  state='';
  city='';
  password = '';
  confirmPassword = '';
  phone = '';
  country = '';
  signupError = '';
  signupSuccess = '';

  get passwordMismatch(): boolean {
    return !!this.password && !!this.confirmPassword && this.password !== this.confirmPassword;
  }

  onRegister() {
    if (!this.passwordMismatch) {
      const signupData: SignupData = {
        fullName: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        city: this.city,
        state: this.state,
        country: this.country,
        age: Number(this.age),
        gender: this.gender
      };
      this.signUpService.registerUser(signupData).subscribe({
        next: (res) => {
          this.signupSuccess = 'Registration successful!';
          this.signupError = '';
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.signupError = 'Registration failed. Please try again.';
          this.signupSuccess = '';
        }
      });
    }
  }
  captchaCode: string = '';
    userCaptcha: string = '';
    captchaStatus: 'valid' | 'invalid' | '' = '';
    
    ngOnInit() {
      this.generateCaptcha();
    }
    
    generateCaptcha(): void {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      this.captchaCode = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      this.userCaptcha = '';
      this.captchaStatus = '';
    }
    
    verifyCaptcha(): void {
      this.captchaStatus = (this.userCaptcha.toUpperCase() === this.captchaCode) ? 'valid' : 'invalid';
    }
}
