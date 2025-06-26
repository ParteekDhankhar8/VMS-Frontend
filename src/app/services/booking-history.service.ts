import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingHistory {
  bookingId: number;
  name: string;
  vaccineName: string;
  date: string;
  status: string;
  memberId?: number;
  certificateId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingHistoryService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/Booking';

  constructor(private http: HttpClient) {}

  getUserBookings(userId: number): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(`${this.apiUrl}/user/${userId}`);
  }

  getFamilyBookings(memberId: number): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(`${this.apiUrl}/family/${memberId}`);
  }
}
