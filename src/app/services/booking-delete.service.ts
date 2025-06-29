import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingDeleteService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/Booking';

  constructor(private http: HttpClient) {}

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
