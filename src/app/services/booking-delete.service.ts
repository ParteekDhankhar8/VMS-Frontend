import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingDeleteService {
  private apiUrl = 'http://localhost:5001/api/Booking';

  constructor(private http: HttpClient) {}

  deleteBooking(userId: number, bookingId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${userId}/booking/${bookingId}`);
  }
}
