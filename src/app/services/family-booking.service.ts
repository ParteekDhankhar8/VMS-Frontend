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
  slotDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class FamilyBookingService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/FamilyMember';

  constructor(private http: HttpClient) {}

  addFamilyMember(data: FamilyMemberData): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' as 'json' });
  }
}
