import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeleteService } from '../services/delete.service';
import { EditSlotService } from '../services/editslot.service';

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
  adminUserId: number = 1; // Replace with actual admin user id from auth context if available
  editIndex: number | null = null;
  editSlotData: SlotApiResponse | null = null;

  constructor(private http: HttpClient, private deleteService: DeleteService, private editSlotService: EditSlotService) {}

  ngOnInit(): void {
    this.fetchSlots();
  }

  fetchSlots() {
    this.http.get('http://localhost:5001/api/Slot/available', { responseType: 'text' })
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

  editSlot(slot: SlotApiResponse, index: number) {
    this.editIndex = index;
    this.editSlotData = { ...slot };
  }

  saveSlot(slot: SlotApiResponse) {
    if (this.editSlotData && this.editIndex !== null) {
      const updatedSlot: SlotApiResponse = {
        slotId: this.editSlotData.slotId ?? slot.slotId,
        vaccineName: this.editSlotData.vaccineName ?? slot.vaccineName,
        locationCity: this.editSlotData.locationCity ?? slot.locationCity,
        locationState: this.editSlotData.locationState ?? slot.locationState,
        locationCountry: this.editSlotData.locationCountry ?? slot.locationCountry,
        slotDate: this.editSlotData.slotDate ?? slot.slotDate,
        availableCount: this.editSlotData.availableCount ?? slot.availableCount,
        vaccinationCenterName: this.editSlotData.vaccinationCenterName ?? slot.vaccinationCenterName
      };
      this.editSlotService.editSlot(slot.slotId, this.adminUserId, updatedSlot).subscribe({
        next: () => {
          this.slots[this.editIndex!] = updatedSlot;
          this.editIndex = null;
          this.editSlotData = null;
          alert('Slot updated successfully.');
        },
        error: (err) => {
          if (err.status === 200 || err.status === 204) {
            this.slots[this.editIndex!] = updatedSlot;
            this.editIndex = null;
            this.editSlotData = null;
            alert('Slot updated successfully.');
          } else {
            alert('Failed to update slot.');
            console.error('Edit slot error:', err);
          }
        }
      });
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.editSlotData = null;
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

