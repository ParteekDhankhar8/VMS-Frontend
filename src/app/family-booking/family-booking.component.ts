import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyBookingService, FamilyMemberData } from '../services/family-booking.service';
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
  selector: 'app-family-booking',
  templateUrl: './family-booking.component.html',
  styleUrls: ['./family-booking.component.css']
})
export class FamilyBookingComponent implements OnInit {
  constructor(
    private router: Router,
    private familyBookingService: FamilyBookingService,
    private http: HttpClient
  ) {}
  currentUser: any = localStorage.getItem('currentUser');
  slots: SlotApiResponse[] = [];
  recipientName: string = '';
  selectedVaccine: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  selectedMember: string = '';
  selectedDate: string = '';
  age: number = 0;
  currentMember: any = localStorage.getItem('memberId');
  gender: string = '';
  userId: number = 1;
  familyMembers: string[] = ['Father', 'Mother','Spouse','Other'];
  minDate: string = '';
  selectedVaccinationCenter: string = '';

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

  get uniqueVaccinationCenters(): string[] {
    return Array.from(new Set(this.slots.map(slot => slot.vaccinationCenterName)));
  }

  onVaccineChange() {
    // Optionally update availableTimes here if you want to filter by slot
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
      const userId = this.currentUser ? JSON.parse(this.currentUser).userId : this.userId;
      const memberId = this.currentMember ? JSON.parse(this.currentMember) : null;
      const familyMember: FamilyMemberData = {
        memberId: memberId,
        fullName: this.recipientName,
        age: this.age,
        gender: this.gender,
        userId: userId,
        vaccineName: this.selectedVaccine,
        state: this.selectedState,
        city: this.selectedCity,
        vaccinationCenterName: this.selectedVaccinationCenter,
        slotDateTime: this.selectedDate

      };
      this.familyBookingService.addFamilyMember(familyMember).subscribe({
        next: (response: any) => {
          alert(`✅ Family member added and appointment booked for ${this.recipientName} (${this.selectedMember}) for ${this.selectedVaccine} in ${this.selectedCity}, ${this.selectedState} on ${this.selectedDate}`);
          this.slots = [] as SlotApiResponse[];
  this.recipientName  = '';
  this.selectedVaccine = '';
  this.selectedState = '';
  this.selectedCity = '';
  this.selectedMember = '';
  this.selectedDate = '';
  this.age = 0;
  this.gender = '';
  this.userId = 1;
  this.familyMembers = ['Father', 'Mother','Spouse','Other'];
  this.minDate = '';
  this.selectedVaccinationCenter = '';
        },
        error: (err: any) => {
          alert('❌ Failed to add family member. Please try again.');
        }
      });
    }
  }
}
