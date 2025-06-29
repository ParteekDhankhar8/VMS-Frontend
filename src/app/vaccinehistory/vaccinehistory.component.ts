import { Component, OnInit } from '@angular/core';
import { ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';

@Component({
  selector: 'app-vaccinehistory',
  templateUrl: './vaccinehistory.component.html',
  styleUrls: ['./vaccinehistory.component.css']
})
export class VaccinehistoryComponent implements OnInit {

vaccinationData: any[] = [];
currentIndex = 0;
currentUser: any = localStorage.getItem('currentUser');
userId: number = this.currentUser ? JSON.parse(this.currentUser).userId : 30;

constructor(private viewFamilyBookingService: ViewFamilyBookingService) {}

ngOnInit() {
  this.getUserBookings();
  this.getFamilyBookings();
}

getUserBookings() {
  this.viewFamilyBookingService.getViewBookings(this.userId).subscribe({
    next: (data: any[]) => {
      if (data && data.length > 0) {
        // Map user bookings to vaccinationData format
        const mapped = data.map(b => ({
          uname: b.fullName || b.uname || 'User',
          name: b.vaccineName || b.name,
          date: b.date || b.slotDate,
          status: b.status || 'Not Taken',
          certificate: 'download certificate'
        }));
        this.vaccinationData = [...this.vaccinationData, ...mapped];
      }
    },
    error: () => {
      // Optionally handle error
    }
  });
}

getFamilyBookings() {
  this.viewFamilyBookingService.getFamilyMembers(this.userId).subscribe({
    next: (data: FamilyMember[]) => {
      if (data && data.length > 0) {
        // Map family bookings to vaccinationData format
        const mapped = data.map(f => ({
          uname: f.fullName,
          // name: f.vaccineName,
          // date: f.slotDate,
          // status: f.status || 'Not Taken',
          certificate: 'download certificate'
        }));
        this.vaccinationData = [...this.vaccinationData, ...mapped];
      }
    },
    error: () => {
      // Optionally handle error
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