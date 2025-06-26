import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RescheduleBookingData {
  bookingId: number;
  userId: number;
  memberId: number;
  country: string;
  slotId: number;
  vaccineName: string;
  vaccinationCenterName: string;
  city: string;
  state: string;
  slotDate: string;
  slotTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class RescheduleBookingService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/Booking/reschedule'; // Replace with actual endpoint if different

  constructor(private http: HttpClient) {}

  rescheduleBooking(data: RescheduleBookingData): Observable<any> {
    return this.http.put(this.apiUrl, data, { responseType: 'text' });
  }
}
