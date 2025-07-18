import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addvaccine',
  templateUrl: './addvaccine.component.html',
  styleUrls: ['./addvaccine.component.css']
})
export class AddvaccineComponent {
  vaccineName: string = '';
  vaccineDescription: string = '';
  addVaccineError: string = '';
  addVaccineSuccess: string = '';

  constructor(private http: HttpClient) {}

  addVaccine() {
    if (!this.vaccineName || !this.vaccineDescription) {
      this.addVaccineError = 'Please fill in all fields.';
      this.addVaccineSuccess = '';
      return;
    }

    const payload = {
      vaccineId: 0,
      name: this.vaccineName,
      description: this.vaccineDescription
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.addVaccineError = '';
    this.addVaccineSuccess = '';
    this.http.post(
      'http://localhost:5001/api/Vaccine?adminUserId=1',
      payload,
      { headers, responseType: 'text' }
    ).subscribe({
      next: (res) => {
        this.addVaccineSuccess = res;
        this.addVaccineError = '';
        this.vaccineName = '';
        this.vaccineDescription = '';
      },
      error: (err) => {
        this.addVaccineSuccess = '';
        this.addVaccineError = 'Failed to add vaccine. Please try again.';
        console.error('Add vaccine error:', err);
      }
    });
  }
}
