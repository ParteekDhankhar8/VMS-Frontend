import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditSlotService {
  private apiUrl = 'http://localhost:5001/api/admin/dashboard/slot';

  constructor(private http: HttpClient) {}

  editSlot(id: number, adminUserId: number, slotData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    const url = `${this.apiUrl}/${id}?adminUserId=${adminUserId}`;
    return this.http.put(url, slotData, { headers });
  }
}
