import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetMethod: 'email' | 'phone' = 'email';
  email = '';
  phone = '';
  message = '';
  selectMethod(method: 'email' | 'phone'): void {
    this.resetMethod = method;
    this.message = ''; 
  }
  sanitizePhone(event: any): void {
    const input = event.target.value || '';
    this.phone = input.replace(/[^0-9]/g, '').slice(0, 10);
  }

  messageColor = '';
  @ViewChild('resetForm', { read: ElementRef }) resetForm!: ElementRef<HTMLFormElement>;
  resetLink: string = '';

  // onSubmit(): void {
  //   if (this.resetMethod === 'email') {
  //     if (this.email && this.isValidEmail(this.email)) {
  //       this.message = `Reset link has been sent to ${this.email}`;
  //       this.messageColor = 'success';
  //     } else {
  //       this.message = '❌ Please enter a valid email address';
  //       this.messageColor = 'danger';
  //     }
  //   } else if (this.resetMethod === 'phone') {
  //     const isPhoneValid = /^[7-9][0-9]{9}$/.test(this.phone);
  //     if (this.phone && isPhoneValid) {
  //       this.message = `Reset code has been sent to ${this.phone}`;
  //       this.messageColor = 'success';
  //     } else {
  //       this.message = '❌ Please enter a valid phone number';
  //       this.messageColor = 'danger';
  //     }
  //   }
  // }


onSubmit(): void {
  if (this.resetMethod === 'email') {
    this.email = this.email.trim();

    if (this.email && this.isValidEmail(this.email)) {
      this.email = this.email.trim();
      this.resetLink = `https://your-app.com/reset-password?email=${encodeURIComponent(this.email)}`;
      console.log('📧 Email value:', this.email);
      console.log('Form content:', this.resetForm.nativeElement);


      emailjs.sendForm(
        'service_l85chpr',
        'template_vfjorhk',
        this.resetForm.nativeElement,
        'tIH9CWdTodLdCyRQQ'
      ).then(() => {
        this.message = `Reset link has been sent to ${this.email}`;
        this.messageColor = 'success';
      }).catch((error) => {
        console.error('EmailJS error:', error);
        this.message = '❌ Failed to send email. Try again later.';
        this.messageColor = 'danger';
      });

    } else {
      this.message = '❌ Please enter a valid email address';
      this.messageColor = 'danger';
    }
  }

}




  
  isFormValid(): boolean {
    if (this.resetMethod === 'email') {
      return this.email.trim().length > 0;
    } else if (this.resetMethod === 'phone') {
      return /^[7-9][0-9]{9}$/.test(this.phone);
    }
    return false;
  }
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email.trim());
  }
    
  
}
