import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FamilyMemberData {
  memberId: number;
  fullName: string;
  age: number;
  gender: string;
  userId: number;
  vaccineName: string;
  state: string;
  city: string;
  vaccinationCenterName: string;
  slotDateTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class FamilyBookingService {
  private apiUrl = 'http://localhost:5001/api/Booking/book';

  constructor(private http: HttpClient) {}

  addFamilyMember(data: FamilyMemberData): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' as 'json' });
  }
}
