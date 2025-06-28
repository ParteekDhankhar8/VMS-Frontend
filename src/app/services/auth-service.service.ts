// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   constructor() { }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
 
// export interface PasswordRecoveryDto {
//   email: string;
//   token?: string;
//   newPassword?: string;
// }
 
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {
//   private baseUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/user/auth';
 
//   constructor(private http: HttpClient) {}
 
//   forgotPassword(email: string): Observable<string> {
//     return this.http.post<string>(`${this.baseUrl}/forgot-password`, { email },{responseType: 'text' as 'json'});
//   }
 
//   resetPassword(data: PasswordRecoveryDto): Observable<string> {
//     return this.http.post<string>(`${this.baseUrl}/reset-password`, data);
//   }
// }

// src/app/services/auth.service.ts
import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private forgetUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/user/auth/forgot-password';
  private resetUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/user/auth/reset-password';

  constructor(private http: HttpClient) {}

  // Sends a reset token to the user's email
  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.forgetUrl, { email } , {responseType: 'text' as 'json'});
  }

  // Resets the password using email, token, and new password
  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(this.resetUrl, { email, token, newPassword } , {responseType: 'text' as 'json'});
  }
}
