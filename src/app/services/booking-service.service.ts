import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  constructor(private http: HttpClient) {}

  // Add your booking-related methods here
  // Example:
  // createBooking(data: any): Observable<any> {
  //   return this.http.post('API_ENDPOINT', data);
  // }

  bookAppointment(booking: any): Observable<any> {
    // Try the most likely correct endpoint for booking creation
    const url = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/Booking/book';
    return this.http.post(url, booking);
  }
}
