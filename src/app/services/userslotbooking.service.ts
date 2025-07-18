import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSlotBookingService {
  private apiUrl = 'http://localhost:5001/api/Slot/delete-booking';

  constructor(private http: HttpClient) {}

  deleteUserSlotBooking(bookingId: number, adminUserId?: number): Observable<any> {
    // Get token from localStorage if needed
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    // Compose URL with path param and optional adminUserId as query param
    let url = `${this.apiUrl}/${bookingId}`;
    if (adminUserId !== undefined && adminUserId !== null) {
      url += `?adminUserId=${adminUserId}`;
    }
    return this.http.delete(url, { headers, responseType: 'json' });
  }
}
