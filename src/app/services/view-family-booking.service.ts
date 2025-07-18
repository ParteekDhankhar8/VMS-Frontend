import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FamilyMember {
  memberId: number;
  fullName: string;
  age: number;
  gender: string;
  userId: number;
  vaccineName: string | null;
  centerName: string | null;
  slotDate: string | null;
  slotTime: string | null;
  city: string | null;
  locationState: string | null;
  vaccinationCenterName: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ViewFamilyBookingService {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  getFamilyMembers(userId: number): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>(`${this.apiUrl}/Booking/user/${userId}`);
  }

  deleteFamilyMember(memberId: number) {
    return this.http.delete(`${this.apiUrl}/Booking/${memberId}`, { responseType: 'text' });
  }

  getViewBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Booking/user/${userId}`);
  }
}
