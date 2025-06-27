// import { Component } from '@angular/core';
// import { OnInit } from '@angular/core';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.css']
// })
// export class BookingComponent implements OnInit {
//   vaccineTypes: string[] = ['Covishield', 'Polio'];

//   states: string[] = ['Maharashtra', 'Karnataka'];
//   cityMap: any = {
//     'Maharashtra': ['Pune', 'Mumbai'],
//     'Karnataka': ['Bangalore', 'Mysore']
//   };

//   selectedVaccine: string = '';
//   selectedState: string = '';
//   selectedCity: string = '';
//   selectedDate: string = '';
//   selectedTime: string = '';

//   availableTimes: string[] = [];
//   minDate: string = '';

//   vaccineAvailability: any = {
//     'Covishield': ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
//     'Polio': ['10:00 AM', '11:00 AM', '1:00 PM']
//   };

//   ngOnInit() {
//     const today = new Date();
//     this.minDate = today.toISOString().split('T')[0];
//   }

//   onVaccineChange() {
//     this.availableTimes = this.selectedVaccine ? this.vaccineAvailability[this.selectedVaccine] : [];
//     this.selectedTime = '';
//   }

//   onStateChange() {
//     this.selectedCity = '';
//   }

//   isPastTime(time: string): boolean {
//     if (!this.selectedDate) return false;

//     const today = new Date();
//     const selected = new Date(this.selectedDate);

//     if (selected.toDateString() !== today.toDateString()) return false;

//     const [hourPart, minutePart, meridian] = time.split(/[:\s]/);
//     let hour = parseInt(hourPart);
//     const minute = parseInt(minutePart);

//     if (meridian === 'PM' && hour !== 12) hour += 12;
//     if (meridian === 'AM' && hour === 12) hour = 0;

//     const slotTime = new Date();
//     slotTime.setHours(hour, minute, 0, 0);

//     return slotTime.getTime() < today.getTime();
//   }

//   bookAppointment() {
//     if (!this.selectedVaccine || !this.selectedState || !this.selectedCity || !this.selectedDate || !this.selectedTime) {
//       alert('Please fill all details before booking.');
//     } else {
//       alert(` Appointment booked for ${this.selectedVaccine} in ${this.selectedCity}, ${this.selectedState} on ${this.selectedDate} at ${this.selectedTime}`);
//     this.selectedVaccine = '';
//     this.selectedState = '';
//     this.selectedCity = '';
//     this.selectedDate = '';
//     this.selectedTime = '';
//     }
//   }
// }




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



  vaccineTypes: string[] = ['Covishield', 'Polio'];
  states: string[] = ['Maharashtra', 'Karnataka'];
  cityMap: { [key: string]: string[] } = {
    'Maharashtra': ['Pune', 'Mumbai'],
    'Karnataka': ['Bangalore', 'Mysore']
  };

  selectedVaccine: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  slots: SlotApiResponse[] = [];

  availableTimes: string[] = [];
  minDate: string = '';

  vaccineAvailability: { [key: string]: string[] } = {
    'Covishield': ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
    'Polio': ['10:00 AM', '11:00 AM', '1:00 PM']
  };

  country: string = 'India'; // Set default or get from user
  vaccinationCenterName: string = ''; // Set as needed
  userId: number = 10; // Replace with actual userId from auth context
  memberId: number = 0; // Set as needed
  slotId: number = 0; // Set as needed

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.fetchSlots();

    // Check if already booked
    // const existing = localStorage.getItem('singleBooking');
    // if (existing) {
    //   alert('⚠️ You have already booked an appointment. Redirecting to view booking...');
    //   this.router.navigate(['/view-booking']);
    // }
  }

  onVaccineChange() {
    this.availableTimes = this.selectedVaccine ? this.vaccineAvailability[this.selectedVaccine] : [];

  }

  fetchSlots() {
    this.http.get('https://f1h42csw-5136.inc1.devtunnels.ms/api/Slot/available', { responseType: 'text' })
      .subscribe({
        next: (res: string) => {
          try {
            this.slots = JSON.parse(res);
            console.log('Fetched slots:', this.slots);
          } catch (e) {
            this.slots = [];
          }
        },
        error: () => {
          this.slots = [];
        }
      });
  }

  onStateChange() {
    this.selectedCity = '';
  }

  // Returns unique vaccination centers for the selected state and vaccine, with availableCount


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
    if (!this.selectedVaccine || !this.selectedState || !this.selectedCity || !this.selectedDate) {
      alert('❌ Please fill all details before booking.');
    } else {
      const booking = {
        userId: this.userId,
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
        next: (response) => {
          alert('✅ Appointment booked successfully!');
          this.router.navigate(['/view-booking']);
        },
        error: (err) => {
          console.error('Booking error:', err);
          alert('❌ Failed to book appointment. ' + (err?.error || 'Please try again.'));
        }
      });
    }
  }
}
