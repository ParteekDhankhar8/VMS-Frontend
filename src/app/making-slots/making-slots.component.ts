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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVaccines();
  }

  fetchVaccines() {
    const url = `https://f1h42csw-5136.inc1.devtunnels.ms/api/Vaccine?adminUserId=${this.adminUserId}`;
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
    const url = `https://f1h42csw-5136.inc1.devtunnels.ms/api/admin/dashboard/add-slot?adminUserId=${this.adminUserId}`;
    this.http.post(url, this.slotForm).subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.showSuccessPopup = true;
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
