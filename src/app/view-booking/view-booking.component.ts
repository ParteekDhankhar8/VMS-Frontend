import { Component, OnInit } from '@angular/core';
import { ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';
import { HttpClient } from '@angular/common/http';

interface SlotApiResponse {
  slotId: number;
  vaccineName: string;
  locationCity: string;
  locationState: string;
  locationCountry: string;
  slotDate: string;
  availableCount: number;
  vaccinationCenterName: string;
}

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  userBookings: any[] = [];
  familyBookings: any[] = [];
  userId: number = 1; // Replace with actual userId from auth context if available
  slots: SlotApiResponse[] = [];

  constructor(private viewFamilyBookingService: ViewFamilyBookingService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchSlotsAndBookings();
  }

  fetchSlotsAndBookings() {
    this.http.get('https://f1h42csw-5136.inc1.devtunnels.ms/api/Slot/available', { responseType: 'text' })
      .subscribe({
        next: (res: string) => {
          try {
            this.slots = JSON.parse(res);
          } catch (e) {
            this.slots = [];
          }
          this.getUserBookings();
          this.getFamilyBookings();
        },
        error: () => {
          this.slots = [];
          this.getUserBookings();
          this.getFamilyBookings();
        }
      });
  }

  getUserBookings() {
    // Example: fetch user bookings from backend or localStorage
    // Here, we use localStorage for demonstration
    const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    // Filter for user bookings (no memberId)
    const userBookingsRaw = allBookings.filter((b: any) => !b.memberId && b.userId === this.userId);
    // Map slot details into each user booking
    this.userBookings = userBookingsRaw.map((ub: any) => {
      const slot = this.slots.find(s => s.slotId === ub.slotId);
      return {
        ...ub,
        vaccineName: slot ? slot.vaccineName : ub.vaccine,
        slotDate: slot ? slot.slotDate : ub.date,
        vaccinationCenterName: slot ? slot.vaccinationCenterName : '-',
        locationState: slot ? slot.locationState : '-',
        locationCity: slot ? slot.locationCity : ub.location
      };
    });
  }

  getFamilyBookings() {
    this.viewFamilyBookingService.getFamilyMembers(this.userId).subscribe({
      next: (data: any[]) => {
        // Map slot details into each family booking
        this.familyBookings = data.map(fb => {
          const slot = this.slots.find(s => s.slotId === fb.slotId);
          return {
            ...fb,
            vaccineName: slot ? slot.vaccineName : '',
            slotDate: slot ? slot.slotDate : '',
            vaccinationCenterName: slot ? slot.vaccinationCenterName : '',
            locationState: slot ? slot.locationState : '',
            locationCity: slot ? slot.locationCity : ''
          };
        });
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
}
