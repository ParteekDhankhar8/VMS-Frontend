import { Component, OnInit } from '@angular/core';
import { ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';

@Component({
  selector: 'app-vaccinehistory',
  templateUrl: './vaccinehistory.component.html',
  styleUrls: ['./vaccinehistory.component.css']
})
export class VaccinehistoryComponent implements OnInit {

vaccinationData: any[] = [];
userBookings: any[] = [];
familyBookings: any[] = [];
currentIndex = 0;
currentUser: any = localStorage.getItem('currentUser');
userId: number = this.currentUser ? JSON.parse(this.currentUser).userId : 30;

constructor(private viewFamilyBookingService: ViewFamilyBookingService) {}

ngOnInit() {
  this.getUserAndFamilyBookings();
}

getUserAndFamilyBookings() {
    const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
    this.viewFamilyBookingService.getViewBookings(userId).subscribe({
      next: (data: any[]) => {
        this.userBookings = data.filter(booking => booking.memberName == null).map(booking => ({
          ...booking,
          uname: booking.uname || booking.name || this.currentUser ? JSON.parse(this.currentUser).name : 'User'
        }));
        this.familyBookings = data.filter(booking => booking.memberName && booking.memberName !== null).map(booking => ({
          ...booking,
          uname: booking.memberName
        }));
        // Combine user and family bookings for display
        this.vaccinationData = [...this.userBookings, ...this.familyBookings];
        console.log('User Bookings:', this.userBookings);
        console.log('Family Bookings:', this.familyBookings);
        console.log('Vaccination Data:', this.vaccinationData);
      },
      error: () => {
        alert('Failed to fetch bookings.');
      }
    });
  }

nextPage() {
  if (this.currentIndex + 5 < this.vaccinationData.length) {
    this.currentIndex += 5;
  }
}

prevPage() {
  if (this.currentIndex - 5 >= 0) {
    this.currentIndex -= 5;
  }
}

toggleStatus(vaccine: any) {
  vaccine.status = vaccine.status === 'Taken' ? 'Not Taken' : 'Taken';
}
}