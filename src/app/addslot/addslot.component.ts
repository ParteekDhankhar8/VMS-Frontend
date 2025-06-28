import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-addslot',
  templateUrl: './addslot.component.html',
  styleUrls: ['./addslot.component.css']
})
export class AddslotComponent implements OnInit {
  vaccineList(vaccineList: any) {
    throw new Error('Method not implemented.');
  }
  slots: SlotApiResponse[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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

  get uniqueLocationCities(): string[] {
    return Array.from(new Set(this.slots.map(slot => slot.locationCity)));
  }

  get uniqueLocationStates(): string[] {
    return Array.from(new Set(this.slots.map(slot => slot.locationState)));
  }

  get uniqueSlotDates(): string[] {
    return Array.from(new Set(this.slots.map(slot => slot.slotDate)));
  }

  get filteredSlots() {
    if (!this.searchText) return this.slots;
    const search = this.searchText.toLowerCase();
    return this.slots.filter(slot =>
      Object.values(slot).some(val =>
        val && val.toString().toLowerCase().includes(search)
      )
    );
  }
}

