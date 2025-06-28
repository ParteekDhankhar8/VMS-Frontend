import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeleteService } from '../services/delete.service';

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
  slots: SlotApiResponse[] = [];
  searchText: string = '';
  adminUserId: number = 1; // Replace with actual admin user id from auth context if available

  constructor(private http: HttpClient, private deleteService: DeleteService) {}

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

  deleteSlot(slotId: number, index: number) {
    if (!confirm('Are you sure you want to delete this slot?')) return;
    this.deleteService.deleteSlot(slotId, this.adminUserId).subscribe({
      next: () => {
        this.slots.splice(index, 1);
        alert('Slot deleted successfully.');
      },
      error: (err) => {
        // Sometimes the slot is deleted but the API returns an error due to empty or non-JSON response
        if (err.status === 200 || err.status === 204) {
          this.slots.splice(index, 1);
          alert('Slot deleted successfully.');
        } else if (err.status === 401) {
          alert('Failed to delete slot. Admin access required or session expired. Please login as admin.');
        } else {
          alert('Failed to delete slot.');
        }
        console.error('Delete slot error:', err);
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

