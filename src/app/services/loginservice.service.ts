
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
// Define login payload shape
export interface LoginPayload {
  email: string;
  password: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
 
  // Replace these URLs with your actual backend endpoints
  private adminLoginUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/admin/login';
  private readonly userLoginUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/user/auth/login';
 
  constructor(private http: HttpClient) { }
 
  // Admin login
  adminLogin(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(this.adminLoginUrl, payload);
  }
 
  // User login
  userLogin(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(this.userLoginUrl, payload)  ;
  }
}