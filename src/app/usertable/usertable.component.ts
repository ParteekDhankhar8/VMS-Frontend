import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserBookingService } from '../services/userbooking.service';
import { UserSlotBookingService } from '../services/userslotbooking.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent {
  bookings: any[] = [];
  fetchError: string = '';
  searchText: string = '';

  constructor(private http: HttpClient, private userBookingService: UserBookingService, private userSlotBookingService: UserSlotBookingService) {
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

  deleteBooking(bookingId: number, index: number) {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    // Delete from backend first
    this.userSlotBookingService.deleteUserSlotBooking(bookingId).subscribe({
      next: () => {
        this.bookings.splice(index, 1);
        alert('Booking deleted successfully.');
      },
      error: (err) => {
        console.error('Delete booking error:', err);
        let msg = 'Failed to delete booking.';
        if (err && err.error) {
          msg += `\n${err.error}`;
        }
        alert(msg);
      }
    });
  }

  // Add this method to store bookingId and details in localStorage for certificate
  storeBookingForCertificate(booking: any) {
    localStorage.setItem('currentBooking', JSON.stringify({
      bookingId: booking.bookingId,
      bookedFor: booking.bookedFor,
      vaccine: booking.vaccine
    }));
    alert('Booking details saved for certificate!');
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
