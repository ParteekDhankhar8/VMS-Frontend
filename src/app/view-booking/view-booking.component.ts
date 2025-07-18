import { Component, OnInit } from '@angular/core';
import { ViewFamilyBookingService, FamilyMember } from '../services/view-family-booking.service';
import { HttpClient } from '@angular/common/http';
import { BookingDeleteService } from '../services/booking-delete.service';

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
  userId: number = 4; // Replace with actual userId from auth context if available
  slots: SlotApiResponse[] = [];
  currentUser: any = localStorage.getItem('currentUser');
  userName: number = this.currentUser ? JSON.parse(this.currentUser).fullName : this.userId;
  // Reschedule modal state
  showRescheduleModal = false;
  selectedBooking: any = null;
  selectedBookingType: 'user' | 'family' | null = null;
  selectedBookingIndex: number | null = null;
  selectedSlotId: number | null = null;

  constructor(
    private viewFamilyBookingService: ViewFamilyBookingService,
    private http: HttpClient,
    private bookingDeleteService: BookingDeleteService
  ) {}

  ngOnInit() {
    this.fetchSlotsAndBookings();
    this.getUserAndFamilyBookings();
  }

  fetchSlotsAndBookings() {
    this.http.get('http://localhost:5001/api/Slot/available', { responseType: 'text' })
      .subscribe({
        next: (res: string) => {
          try {
            this.slots = JSON.parse(res);
          } catch (e) {
            this.slots = [];
          }
          this.getUserAndFamilyBookings();
        },
        error: () => {
          this.slots = [];
          this.getUserAndFamilyBookings();
        }
      });
  }

  getUserAndFamilyBookings() {
    const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
    this.viewFamilyBookingService.getViewBookings(userId).subscribe({
      next: (data: any[]) => {
        this.userBookings = data.filter(booking => booking.memberName == null).map(booking => {
          // Try to get locationState from slot if missing
          if (!booking.locationState) {
            const slot = this.slots.find(s => s.slotId === booking.slotId);
            return {
              ...booking,
              locationState: slot ? slot.locationState : ''
            };
          }
          return booking;
        });
        // For each family booking, fetch full details from backend
        const familyBookingsRaw = data.filter(booking => booking.memberName && booking.memberName !== null);
        if (familyBookingsRaw.length > 0) {
          this.familyBookings = [];
          familyBookingsRaw.forEach(fb => {
            this.viewFamilyBookingService.getFamilyMembers(userId).subscribe({
              next: (members) => {
                const member = members.find(m => m.memberId === fb.memberId);
                if (member) {
                  this.familyBookings.push({ ...fb, ...member });
                } else {
                  this.familyBookings.push(fb);
                }
              },
              error: () => {
                this.familyBookings.push(fb);
              }
            });
          });
        } else {
          this.familyBookings = [];
        }
        console.log('User Bookings:', this.userBookings);
        console.log('Family Bookings:', this.familyBookings);
      },
      error: () => {
        alert('Failed to fetch bookings.');
      }
    });
  }

  // getFamilyBookings() {
  //   const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
  //   this.viewFamilyBookingService.getFamilyMembers(userId).subscribe({
  //     next: (data: any[]) => {
  //       // Map slot details into each family booking
  //       this.familyBookings = data.map(fb => {
  //         const slot = this.slots.find(s => s.slotId === fb.slotId);
  //         return {
  //           ...fb,
  //           vaccineName: slot ? slot.vaccineName : '',
  //           slotDate: slot ? slot.slotDate : '',
  //           vaccinationCenterName: slot ? slot.vaccinationCenterName : '',
  //           locationState: slot ? slot.locationState : '',
  //           locationCity: slot ? slot.locationCity : ''
  //         };
  //       });
  //     },
  //     error: (err) => {
  //       alert('Failed to fetch family bookings.');
  //     }
  //   });
  // }

  deleteUserBooking(index: number) {
    const bookingId = this.userBookings[index].bookingId;
    const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
    this.bookingDeleteService.deleteBooking(userId, bookingId).subscribe({
      next: () => {
        this.getUserAndFamilyBookings();
        setTimeout(() => {
          const stillExists = this.userBookings.some(b => b.bookingId === bookingId);
          if (!stillExists) {
            alert('Booking cancelled successfully');
          } else {
            alert('Failed to delete booking.');
          }
        }, 500);
      },
      error: () => {
        this.getUserAndFamilyBookings();
        setTimeout(() => {
          const stillExists = this.userBookings.some(b => b.bookingId === bookingId);
          if (!stillExists) {
            alert('Booking cancelled and slot restored.');
          } else {
            alert('Failed to delete booking.');
          }
        }, 500);
      }
    });
  }

  deleteFamilyBooking(index: number) {
    const memberId = this.familyBookings[index].memberId;
    const name = this.familyBookings[index].fullName;
    this.viewFamilyBookingService.deleteFamilyMember(memberId).subscribe({
      next: () => {
        alert(`Family booking for ${name} deleted successfully.`);
        this.getUserAndFamilyBookings();
      },
      error: (err) => {
        if ([200, 204].includes(err.status)) {
          alert(`Family booking for ${name} deleted successfully.`);
          this.getUserAndFamilyBookings();
        } else {
          alert('Failed to delete family booking.');
        }
      }
    });
  }

  openRescheduleModal(booking: any, type: 'user' | 'family', index: number) {
    this.selectedBooking = booking;
    this.selectedBookingType = type;
    this.selectedBookingIndex = index;
    this.selectedSlotId = null;
    this.showRescheduleModal = true;
  }

  closeRescheduleModal() {
    this.showRescheduleModal = false;
    this.selectedBooking = null;
    this.selectedBookingType = null;
    this.selectedBookingIndex = null;
    this.selectedSlotId = null;
  }

  submitReschedule() {
    if (!this.selectedSlotId || this.selectedBookingIndex === null || !this.selectedBookingType) return;

    if (this.selectedBookingType === 'user') {
      // For demo: just update the slot in the local array
      const slot = this.slots.find(s => s.slotId == this.selectedSlotId);
      if (slot) {
        this.userBookings[this.selectedBookingIndex] = {
          ...this.userBookings[this.selectedBookingIndex],
          vaccine: slot.vaccineName,
          date: slot.slotDate,
          location: slot.locationCity
        };
      }
      this.closeRescheduleModal();
      alert('User booking rescheduled!');
    } else if (this.selectedBookingType === 'family') {
      // For demo: update slot in local array, in real app call backend API
      const slot = this.slots.find(s => s.slotId == this.selectedSlotId);
      if (slot) {
        this.familyBookings[this.selectedBookingIndex] = {
          ...this.familyBookings[this.selectedBookingIndex],
          slotId: slot.slotId,
          vaccineName: slot.vaccineName,
          slotDate: slot.slotDate,
          vaccinationCenterName: slot.vaccinationCenterName,
          locationState: slot.locationState,
          locationCity: slot.locationCity
        };
      }
      this.closeRescheduleModal();
      alert('Family booking rescheduled!');
    }
  }
}
