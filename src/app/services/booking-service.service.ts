
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
// Define the shape of the booking data to send
export interface BookingData {
  userId: any;
  memberId: any;
  slotId: any;
  vaccineType: string;
  state: string;
  city: string;
  date: string;
  time: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
 
  // Replace this URL with your actual backend API endpoint
  private bookingApiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/Booking/book';
 
  constructor(private http: HttpClient) {}
 
  // Method to send booking data to backend
  bookAppointment(data: BookingData): Observable<any> {
    return this.http.post(this.bookingApiUrl, data, { responseType: 'text' });
  }
}