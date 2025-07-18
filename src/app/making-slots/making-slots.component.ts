import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-making-slots',
  templateUrl: './making-slots.component.html',
  styleUrls: ['./making-slots.component.css']
})
export class MakingSlotsComponent implements OnInit {
  slotForm = {
    slotId: 0,
    vaccineName: '',
    locationCity: '',
    locationState: '',
    locationCountry: '',
    slotDate: '',
    availableCount: 0,
    vaccinationCenterName: ''
  };
  adminUserId = 1;
  responseMsg = '';
  vaccines: Array<{vaccineId: number, name: string, description: string}> = [];
  showSuccessPopup = false;
  minDateTime: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVaccines();
    const now = new Date();
    // Round up to next 5-minute interval
    now.setSeconds(0);
    now.setMilliseconds(0);
    const minutes = now.getMinutes();
    now.setMinutes(minutes + (5 - (minutes % 5)) % 5);
    this.minDateTime = now.toISOString().slice(0, 16); // Set minimum date to current date and time
  }

  fetchVaccines() {
    const url = `http://localhost:5001/api/Vaccine?adminUserId=${this.adminUserId}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.vaccines = data;
      },
      error: (err) => {
        this.vaccines = [];
      }
    });
  }

  addSlot() {
    // Prevent adding slot with past date/time
    if (new Date(this.slotForm.slotDate) < new Date(this.minDateTime)) {
      this.responseMsg = 'Cannot select a past date/time.';
      return;
    }
    this.showSuccessPopup = true; // Always show popup for testing
    const url = `http://localhost:5001/api/admin/dashboard/add-slot?adminUserId=${this.adminUserId}`;
    this.http.post(url, this.slotForm).subscribe({
      next: (res) => {
        console.log('Success:', res);
        // this.showSuccessPopup = true; // Already set above
      },
      error: (err) => {
        console.error('Error:', err);
        this.responseMsg = 'Error adding slot.';
      }
    });
  }

  onPopupOk() {
    this.showSuccessPopup = false;
    this.slotForm = {
      slotId: 0,
      vaccineName: '',
      locationCity: '',
      locationState: '',
      locationCountry: '',
      slotDate: '',
      availableCount: 0,
      vaccinationCenterName: ''
    };
  }
}
