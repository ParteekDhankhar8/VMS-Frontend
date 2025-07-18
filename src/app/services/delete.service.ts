import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private apiUrl = 'http://localhost:5001/api/admin/dashboard/slot';

  constructor(private http: HttpClient) {}

  deleteSlot(slotId: number, adminUserId: number): Observable<any> {
    // Get token from localStorage (update the key if your token is stored under a different name)
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    // Send slotId and adminUserId as query parameters
    const url = `${this.apiUrl}?slotId=${slotId}&adminUserId=${adminUserId}`;
    return this.http.delete(url, { headers });
  }
}
