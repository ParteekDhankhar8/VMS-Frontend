import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditVaccineService {
  private apiUrl = 'http://localhost:5001/api/admin/dashboard/vaccine';

  constructor(private http: HttpClient) {}

  editVaccine(id: number, adminUserId: number, vaccineData: any): Observable<any> {
    // Get token from localStorage if needed
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    // Compose URL with path param and query param
    const url = `${this.apiUrl}/${id}?adminUserId=${adminUserId}`;
    return this.http.put(url, vaccineData, { headers });
  }
}
