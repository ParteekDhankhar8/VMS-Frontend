
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface Appointment {
  nextAppointment: string;
  vaccineName: string;
  dateOfAppointment: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://your-backend-url/api/appointments/next'; // Change to your actual endpoint
 
  constructor(private http: HttpClient) {}
 
  getNextAppointment(): Observable<Appointment> {
    return this.http.get<Appointment>(this.apiUrl);
  }
}