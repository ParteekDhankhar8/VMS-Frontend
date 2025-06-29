import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from '../services/booking-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  constructor(
    private router: Router,
    private bookingService: BookingServiceService, // Inject the booking service
    private http: HttpClient
  ) { }

  slots: SlotApiResponse[] = [];
  selectedVaccine: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  availableTimes: string[] = [];
  minDate: string = '';
  country: string = 'India';
  vaccinationCenterName: string = '';
  currentUser: any = localStorage.getItem('currentUser')
  memberId: number = 0;
  slotId: number = 0;

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.fetchSlots();
  }

  fetchSlots() {
    this.http.get('https://f1h42csw-5136.inc1.devtunnels.ms/api/Slot/available', { responseType: 'text' })
      .subscribe({
        next: (res: string) => {
          try {
            this.slots = JSON.parse(res);
          } catch (e) {
            this.slots = [];
          }
        },
        error: () => {
          this.slots = [];
        }
      });
  }

  get uniqueVaccineNames(): string[] {
    return Array.from(new Set(this.slots.map(slot => slot.vaccineName)));
  }

  get uniqueLocationStates(): string[] {
    return Array.from(new Set(this.slots.map(slot => slot.locationState)));
  }

  get uniqueLocationCities(): string[] {
    return this.selectedState
      ? Array.from(new Set(this.slots.filter(slot => slot.locationState === this.selectedState).map(slot => slot.locationCity)))
      : [];
  }

  get uniqueSlotDates(): string[] {
    return this.slots
      .filter(slot =>
        (!this.selectedVaccine || slot.vaccineName === this.selectedVaccine) &&
        (!this.selectedState || slot.locationState === this.selectedState) &&
        (!this.selectedCity || slot.locationCity === this.selectedCity)
      )
      .map(slot => slot.slotDate)
      .filter((date, i, arr) => arr.indexOf(date) === i);
  }

  onVaccineChange() {
    // Optionally update availableTimes here if you want to filter by slot
    this.selectedTime = '';
  }

  onStateChange() {
    this.selectedCity = '';
  }

  isPastTime(time: string): boolean {
    if (!this.selectedDate) return false;
    const today = new Date();
    const selected = new Date(this.selectedDate);
    if (selected.toDateString() !== today.toDateString()) return false;
    const [hourPart, minutePart, meridian] = time.split(/[:\s]/);
    let hour = parseInt(hourPart, 10);
    const minute = parseInt(minutePart, 10);
    if (meridian === 'PM' && hour !== 12) hour += 12;
    if (meridian === 'AM' && hour === 12) hour = 0;
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);
    return slotTime.getTime() < today.getTime();
  }

  

  bookAppointment() {
    if (!this.selectedVaccine || !this.selectedState || !this.selectedCity || !this.selectedDate || !this.vaccinationCenterName) {
      alert('❌ Please fill all details before booking.');
    } else {
      // Find the slotId based on user selections
      const selectedSlot = this.slots.find(slot =>
        slot.vaccineName === this.selectedVaccine &&
        slot.locationState === this.selectedState &&
        slot.locationCity === this.selectedCity &&
        slot.slotDate === this.selectedDate &&
        slot.vaccinationCenterName === this.vaccinationCenterName
      );
      if (!selectedSlot) {
        alert('❌ No available slot found for the selected details.');
        return;
      }
      this.slotId = selectedSlot.slotId;
      const userId = JSON.parse(this.currentUser)?.userId;
      const booking = {
        userId: userId,
        memberId: this.memberId,
        country: this.country,
        slotId: this.slotId,
        vaccineName: this.selectedVaccine,
        vaccinationCenterName: this.vaccinationCenterName,
        city: this.selectedCity,
        state: this.selectedState,
        slotDateTime: this.selectedDate,
      };
      this.bookingService.bookAppointment(booking).subscribe({
        next: (response: any) => {
          alert('✅ Appointment booked successfully!');
          this.router.navigate(['/view-booking']);
        },
        error: (err: any) => {
          console.error('Booking error:', err);
          alert('❌ Failed to book appointment. ' + (err?.error || 'Please try again.'));
        }
      });
    }
  }
}
