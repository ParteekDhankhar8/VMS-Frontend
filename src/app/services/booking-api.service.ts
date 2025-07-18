import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  private apiUrl = 'http://localhost:5001/api/Booking';

  constructor(private http: HttpClient) {}

  getUserBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteBooking(bookingId: number): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const url = `${this.apiUrl}/${bookingId}`;
    return this.http.delete(url,{responseType: 'text' as 'json'});
  }
}
