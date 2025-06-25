import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-family-booking',
  templateUrl: './family-booking.component.html',
  styleUrls: ['./family-booking.component.css']
})
export class FamilyBookingComponent implements OnInit {
  vaccineTypes: string[] = ['Covishield', 'Polio'];
  states: string[] = ['Maharashtra', 'Karnataka'];
  familyMembers: string[] = ['Father', 'Mother', 'Brother', 'Sister', 'Other'];

  cityMap: { [key: string]: string[] } = {
    'Maharashtra': ['Pune', 'Mumbai'],
    'Karnataka': ['Bangalore', 'Mysore']
  };

  selectedVaccine: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  selectedMember: string = '';
  selectedDate: string = '';
  selectedTime: string = '';

  availableTimes: string[] = [];
  minDate: string = '';

  vaccineAvailability: { [key: string]: string[] } = {
    'Covishield': ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
    'Polio': ['10:00 AM', '11:00 AM', '1:00 PM']
  };

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  onVaccineChange() {
    this.availableTimes = this.selectedVaccine ? this.vaccineAvailability[this.selectedVaccine] : [];
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
    if (
      !this.selectedVaccine ||
      !this.selectedState ||
      !this.selectedCity ||
      !this.selectedDate ||
      !this.selectedTime ||
      !this.selectedMember
    ) {
      alert('Please fill all details before booking.');
    } else {
      alert(
        `✅ Appointment booked for ${this.selectedVaccine} (${this.selectedMember}) in ${this.selectedCity}, ${this.selectedState} on ${this.selectedDate} at ${this.selectedTime}`
      );
    }
  }
}
