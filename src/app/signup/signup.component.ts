import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router){}
  name = '';
  email = '';
  age ='';
  gender='';
  state='';
  city='';
  password = '';
  confirmPassword = '';

  get passwordMismatch(): boolean {
    return !!this.password && !!this.confirmPassword && this.password !== this.confirmPassword;
  }

  onRegister() {
    if (!this.passwordMismatch) {
      console.log('Registered:', this.name, this.email);
      alert('Registeration successfull');
      this.router.navigate(['/login']);
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
