// import { Component } from '@angular/core';
// import emailjs from '@emailjs/browser';
// import { ElementRef, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthServiceService } from '../services/auth-service.service';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   step = 1;
//   message = '';
//   isSubmitting = false;
 
//   emailForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]]
//   });
 
//   resetForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     token: ['', Validators.required],
//     newPassword: ['', [Validators.required, Validators.minLength(6)]]
//   });
 
//   constructor(private fb: FormBuilder, private authService: AuthServiceService) {}
 
//   sendToken() {
//     if (this.emailForm.invalid) {
//       this.message = 'Please enter a valid email.';
//       return;
//     }
//     this.isSubmitting = true;
//     this.authService.forgotPassword(this.emailForm.value.email!).subscribe(
//       (res: string) => {
//         if (res) {
         
//           this.message = 'Token generated! Please ask the admin for your reset token (check backend console).';
//           this.resetForm.patchValue({ email: this.emailForm.value.email });
//           this.step = 2;
//         } else {
//           console.log(res)
//           this.message = 'User not found or not allowed to reset password.';
//         }
//         this.isSubmitting = false;
//       },
//       () => {
//         this.message = 'Failed to send reset token.';
//         this.isSubmitting = false;
//       }
//     );
//   }
 
//   resetPassword() {
//     if (this.resetForm.invalid) {
//       this.message = 'Please fill all fields correctly.';
//       return;
//     }
//     this.isSubmitting = true;
//     const { email, token, newPassword } = this.resetForm.value;
//     this.authService.resetPassword({
//       email: email!,
//       token: token!,
//       newPassword: newPassword!
//     }).subscribe(
//       (res: string) => {
//         if (res === 'success') {
//           this.message = 'Password reset successful!';
//           this.resetForm.reset();
//           this.emailForm.reset();
//           this.step = 1;
//         } else {
//           this.message = 'Invalid token or user. Please check your details.';
//         }
//         this.isSubmitting = false;
//       },
//       err => {
//         this.message = 'Failed to reset password.';
//         this.isSubmitting = false;
//       }
//     );
//   }
 
//  }
  

// src/app/components/forgot-reset/forgot-reset.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  step = 1;
  isSubmitting = false;
  message = '';

  emailForm!: FormGroup;
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1) build the email form (step 1)
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // 2) build the reset form (step 2)
    this.resetForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Step 1: send reset token to email
  sendToken(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const email = this.emailForm.value.email;

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.message = 'A reset token has been sent to your email.';
        this.step = 2;
        this.resetForm.patchValue({ email });
      },
      error: (err) => {
        console.error('Token send error:', err); // Add this line
        this.message = err.error?.message || 'Failed to send reset token.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  // Step 2: reset the password using token
  resetPassword(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { email, token, newPassword } = this.resetForm.getRawValue();

    this.auth.resetPassword(email, token, newPassword).subscribe({
      next: () => {
        this.message = 'Password has been reset successfully.';
        this.step = 1;
        this.emailForm.reset();
        // Redirect to login page after a short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed to reset password.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}


