import { Component, OnInit } from '@angular/core';
import { ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';
// If you have a user booking service, import it here as well
// import { UserBookingService, UserBooking } from '../services/user-booking.service';

@Component({
  selector: 'app-rescheduleview',
  templateUrl: './rescheduleview.component.html',
  styleUrls: ['./rescheduleview.component.css']
})
export class RescheduleviewComponent implements OnInit {
  userBookings: any[] = [];
  familyBookings: FamilyMember[] = [];
  userId: number = 1; // Replace with actual userId from auth context

  constructor(private viewFamilyBookingService: ViewFamilyBookingService) {}

  ngOnInit() {
    this.getFamilyBookings();
    // this.getUserBookings(); // Uncomment and implement if you have a user booking service
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

  // getUserBookings() {
  //   this.userBookingService.getUserBookings(this.userId).subscribe({
  //     next: (data) => {
  //       this.userBookings = data;
  //     },
  //     error: (err) => {
  //       alert('Failed to fetch user bookings.');
  //     }
  //   });
  // }
}
