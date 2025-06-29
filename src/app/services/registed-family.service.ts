import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterFamilyMember {
  memberId: number;
  fullName: string;
  age: number;
  gender: string;
  userId: number;
  city?: string;
  locationState?: string;
  relation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistedFamilyService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/FamilyMember';

  constructor(private http: HttpClient) {}

  registerFamilyMember(member: RegisterFamilyMember): Observable<any> {
    return this.http.post(this.apiUrl, member);
  }
}
