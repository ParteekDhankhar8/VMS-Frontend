

 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
// Define the shape of user registration data
export interface SignupData {
  fullName: string,
  email: string,
  phone: string,
  password: string,
  city: string,
  state: string,
  country: string,
  age: number,
  gender:string
}
 
@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {
 
  // Your backend registration API URL
  private readonly apiUrl = 'http://localhost:5001/api/user/register';  // Change to your actual URL
 
  constructor(private http: HttpClient) {}
 
  // Send registration data to backend
  registerUser(data: SignupData): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
 
}