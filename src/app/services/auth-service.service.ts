// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface PasswordRecoveryDto {
  email: string;
  token?: string;
  newPassword?: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/user/auth';
 
  constructor(private http: HttpClient) {}
 
  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/forgot-password`, { email },{responseType: 'text' as 'json'});
  }
 
  resetPassword(data: PasswordRecoveryDto): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/reset-password`, data);
  }
}