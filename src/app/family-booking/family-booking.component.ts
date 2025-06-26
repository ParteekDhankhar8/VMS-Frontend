import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyBookingService, FamilyMemberData } from '../services/family-booking.service';



@Component({
  selector: 'app-family-booking',
  templateUrl: './family-booking.component.html',
  styleUrls: ['./family-booking.component.css']
})
export class FamilyBookingComponent implements OnInit {
  constructor(
    private router: Router,
    private familyBookingService: FamilyBookingService // Inject the service
  ) {}

  vaccineTypes: string[] = ['Covishield', 'Polio'];
  states: string[] = ['Maharashtra', 'Karnataka'];
  familyMembers: string[] = ['Father', 'Mother','Spouse'];

  cityMap: { [key: string]: string[] } = {
    'Maharashtra': ['Pune', 'Mumbai'],
    'Karnataka': ['Bangalore', 'Mysore']
  };
  recipientName: string = '';
  selectedVaccine: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  selectedMember: string = '';
  selectedDate: string = '';

  age: number = 0;
  gender: string = '';
  userId: number = 1; // Replace with actual userId from auth context if available

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
      !this.recipientName ||
      !this.selectedVaccine ||
      !this.selectedState ||
      !this.selectedCity ||
      !this.selectedDate ||
      !this.selectedMember ||
      !this.age ||
      !this.gender
    ) {
      alert('Please fill all details before booking.');
    } else {
      const familyMember: FamilyMemberData = {
        memberId: 0, // Let backend assign or set as needed
        fullName: this.recipientName,
        age: this.age,
        gender: this.gender,
        userId: this.userId
      };
      this.familyBookingService.addFamilyMember(familyMember).subscribe({
        next: (response) => {
          alert(`✅ Family member added and appointment booked for ${this.recipientName} (${this.selectedMember}) for ${this.selectedVaccine} in ${this.selectedCity}, ${this.selectedState} on ${this.selectedDate}`);
          this.router.navigate(['/view-booking']);
        },
        error: (err) => {
          alert('❌ Failed to add family member. Please try again.');
        }
      });
    }
  }
}
