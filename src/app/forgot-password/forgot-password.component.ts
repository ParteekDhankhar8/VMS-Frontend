import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step = 1;
  message = '';
  isSubmitting = false;
 
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
 
  resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    token: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });
 
  constructor(private fb: FormBuilder, private authService: AuthServiceService) {}
 
  sendToken() {
    if (this.emailForm.invalid) {
      this.message = 'Please enter a valid email.';
      return;
    }
    this.isSubmitting = true;
    this.authService.forgotPassword(this.emailForm.value.email!).subscribe(
      (res: string) => {
        if (res) {
         
          this.message = 'Token generated! Please ask the admin for your reset token (check backend console).';
          this.resetForm.patchValue({ email: this.emailForm.value.email });
          this.step = 2;
        } else {
          console.log(res)
          this.message = 'User not found or not allowed to reset password.';
        }
        this.isSubmitting = false;
      },
      () => {
        this.message = 'Failed to send reset token.';
        this.isSubmitting = false;
      }
    );
  }
 
  resetPassword() {
    if (this.resetForm.invalid) {
      this.message = 'Please fill all fields correctly.';
      return;
    }
    this.isSubmitting = true;
    const { email, token, newPassword } = this.resetForm.value;
    this.authService.resetPassword({
      email: email!,
      token: token!,
      newPassword: newPassword!
    }).subscribe(
      (res: string) => {
        if (res === 'success') {
          this.message = 'Password reset successful!';
          this.resetForm.reset();
          this.emailForm.reset();
          this.step = 1;
        } else {
          this.message = 'Invalid token or user. Please check your details.';
        }
        this.isSubmitting = false;
      },
      err => {
        this.message = 'Failed to reset password.';
        this.isSubmitting = false;
      }
    );
  }
 
 }
  

