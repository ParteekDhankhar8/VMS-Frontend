import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent {
  bookings: any[] = [];
  fetchError: string = '';
  searchText: string = '';

  constructor(private http: HttpClient) {
    this.fetchBookings();
  }

  fetchBookings() {
    const url = `https://f1h42csw-5136.inc1.devtunnels.ms/api/admin/dashboard/all-bookings?adminUserId=1`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (res: string) => {
        try {
          console.log('Raw response:', res);
          this.bookings = JSON.parse(res);
          this.fetchError = '';
        } catch (e) {
          console.error('Error parsing bookings:', e);
          this.bookings = [];
          this.fetchError = 'Failed to parse bookings.';
        }
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
        this.bookings = [];
        this.fetchError = 'API error: could not fetch bookings.';
      }
    });
  }

  get filteredBookings() {
    if (!this.searchText) return this.bookings;
    const search = this.searchText.toLowerCase();
    return this.bookings.filter(b =>
      Object.values(b).some(val =>
        val && val.toString().toLowerCase().includes(search)
      )
    );
  }
}
