import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FamilyMember {
  memberId: number;
  fullName: string;
  age: number;
  gender: string;
  userId: number;
  vaccineName: string;
  date: string;
  time: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewFamilyBookingService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/FamilyMember/user';

  constructor(private http: HttpClient) {}

  getFamilyMembers(userId: number): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>(`${this.apiUrl}/${userId}`);
  }

  deleteFamilyMember(memberId: number) {
    return this.http.delete(`${this.apiUrl.replace('/user', '')}/${memberId}`, { responseType: 'text' });
  }
}
