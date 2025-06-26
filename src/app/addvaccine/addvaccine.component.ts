import { Component } from '@angular/core';

@Component({
  selector: 'app-addvaccine',
  templateUrl: './addvaccine.component.html',
  styleUrls: ['./addvaccine.component.css']
})
export class AddvaccineComponent {
vaccineName:string='';
 dosesAvailable: number | null = null;

  addVaccine() {
    if (this.vaccineName && this.dosesAvailable !== null) {
      // Logic to add the vaccine
      console.log(`Adding vaccine: ${this.vaccineName} with ${this.dosesAvailable} doses available.`);
      
      // Reset form fields
      this.vaccineName = '';
      this.dosesAvailable = null;
    } else {
      alert('Please fill in all fields.');
    }
  }
}
