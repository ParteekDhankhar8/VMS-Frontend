import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CertificateData {
  certificateId: number;
  userId: number;
  fullName: string;
  vaccineName: string;
  vaccinationDate: string;
  issuedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl = 'https://f1h42csw-5136.inc1.devtunnels.ms/api/Certificate'; // Replace with actual endpoint if different

  constructor(private http: HttpClient) {}

  getCertificate(userId: number): Observable<CertificateData> {
    return this.http.get<CertificateData>(`${this.apiUrl}/user/${userId}`);
  }

  downloadCertificate(certificateId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${certificateId}`, { responseType: 'blob' });
  }

  downloadCertificateForMember(memberId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/person?memberId=${memberId}`, { responseType: 'blob' });
  }

  bookAppointment(booking: any) {
    // Get all bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    // Assign a unique bookingId
    booking.bookingId = Date.now();
    allBookings.push(booking);
    localStorage.setItem('allBookings', JSON.stringify(allBookings));
  }
}
