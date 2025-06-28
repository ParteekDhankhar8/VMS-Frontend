import { Component, OnInit } from '@angular/core';
import{ ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';
import { HttpClient } from '@angular/common/http';
import { BookingApiService } from '../services/booking-api.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  userBookings: any[] = [];
  familyBookings: FamilyMember[] = [];
  userId: number = 4; // Replace with actual userId from auth context if available
  currentUser: any = localStorage.getItem('currentUser');
  userName: any = this.currentUser ? JSON.parse(this.currentUser).fullName : 'User';

  constructor(private viewFamilyBookingService: ViewFamilyBookingService, private http: HttpClient, private bookingApiService: BookingApiService) {}

  ngOnInit() {
    this.getUserBookings();
    this.getFamilyBookings();
  }

  getUserBookings() {
    const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
    this.viewFamilyBookingService.getViewBookings(userId).subscribe({
      next: (data: any[]) => {
        console.log('User bookings data:', data);
        // Only keep bookings with status 'Booked' for the current user
        this.userBookings = (data && data.length > 0) ? data.filter(b => b.status === 'Booked') : [];
      },
      error: () => {
        alert('Failed to fetch user bookings.');
      }
    });
  }

  getFamilyBookings() {
    const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
    this.viewFamilyBookingService.getFamilyMembers(userId).subscribe({
      next: (data: FamilyMember[]) => {
        console.log('Family bookings data:', data);
        // No need to map slot details, API now returns all fields
        this.familyBookings = data;
      },
      error: () => {
        alert('Failed to fetch family bookings.');
      }
    });
  }

  deleteUserBooking(index: number) {
    const booking = this.userBookings[index];
    if (booking.status !== 'Booked') {
      alert('Only active bookings can be deleted.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this booking?')) {
      this.bookingApiService.deleteBooking(booking.bookingId).subscribe({
        next: () => {
          this.getUserBookings(); // Always re-fetch from backend after delete
          alert('Booking deleted successfully.');
        },
        error: (err) => {
          alert('Failed to delete booking.');
          console.error('Delete booking error:', err);
        }
      });
    }
  }

  deleteFamilyBooking(index: number) {
    const memberId = this.familyBookings[index].memberId;
    const name = this.familyBookings[index].fullName;
    this.viewFamilyBookingService.deleteFamilyMember(memberId).subscribe({
      next: () => {
        this.familyBookings.splice(index, 1);
        alert(`Family booking for ${name} deleted successfully.`);
      },
      error: () => {
        alert('Failed to delete family booking.');
      }
    });
  }

  deleteAllCancelledBookings() {
    const cancelledBookings = this.userBookings.filter(b => b.status === 'Cancelled');
    if (cancelledBookings.length === 0) {
      alert('No cancelled bookings to delete.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete all ${cancelledBookings.length} cancelled bookings?`)) {
      return;
    }
    let deletedCount = 0;
    cancelledBookings.forEach(booking => {
      this.bookingApiService.deleteBooking(booking.bookingId).subscribe({
        next: () => {
          deletedCount++;
          if (deletedCount === cancelledBookings.length) {
            this.getUserBookings(); // Refresh after all deletes
            alert('All cancelled bookings deleted successfully.');
          }
        },
        error: (err) => {
          console.error('Failed to delete cancelled booking:', booking.bookingId, err);
        }
      });
    });
  }
}
