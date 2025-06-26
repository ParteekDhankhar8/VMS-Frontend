import { Component, OnInit } from '@angular/core';
import { ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  userBookings = [
    { name: 'Alice', vaccine: 'Covaxin', date: '2025-06-25', time: '09:00 AM', location: 'Chennai' }
    
  ];
  familyBookings: FamilyMember[] = [];
  userId: number = 1; // Replace with actual userId from auth context if available

  constructor(private viewFamilyBookingService: ViewFamilyBookingService) {}

  ngOnInit() {
    this.getFamilyBookings();
  }

  getFamilyBookings() {
    this.viewFamilyBookingService.getFamilyMembers(this.userId).subscribe({
      next: (data) => {
        this.familyBookings = data;
      },
      error: (err) => {
        alert('Failed to fetch family bookings.');
      }
    });
  }

  deleteUserBooking(index: number) {
    this.userBookings.splice(index, 1);
  }

  deleteFamilyBooking(index: number) {
    const memberId = this.familyBookings[index].memberId;
    this.viewFamilyBookingService.deleteFamilyMember(memberId).subscribe({
      next: () => {
        this.familyBookings.splice(index, 1);
        alert('Family booking deleted successfully.');
      },
      error: () => {
        alert('Failed to delete family booking.');
      }
    });
  }
}
