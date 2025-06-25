import { Component } from '@angular/core';

@Component({
  selector: 'app-addslot',
  templateUrl: './addslot.component.html',
  styleUrls: ['./addslot.component.css']
})
export class AddslotComponent {
  vaccineData: any = {
    Maharashtra: {
      Pune: {
        Covishield: ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM'],
        Polio: ['10:00 AM - 11:00 AM']
      },
      Mumbai: {
        Covishield: ['2:00 PM - 3:00 PM'],
        Polio: []
      }
    },
    Karnataka: {
      Bangalore: {
        Covishield: ['9:00 AM - 10:00 AM'],
        Polio: ['10:00 AM - 11:00 AM']
      },
      Mysore: {
        Covishield: [],
        Polio: []
      }
    }
  };
 
  // Time slot options
  slotOptions: string[] = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM'
  ];
 
  editingRow: { state: string, city: string, vaccine: string } | null = null;
 
  editState: string = '';
  editCity: string = '';
  editVaccine: string = '';
  editSlots: string[] = [];
 
  isAdding: boolean = false;
  newState: string = '';
  newCity: string = '';
  newVaccine: string = '';
  newSlots: string[] = [];
 
  getStates(): string[] {
    return Object.keys(this.vaccineData);
  }
 
  getCities(state: string): string[] {
    return Object.keys(this.vaccineData[state] || {});
  }
 
  getVaccines(state: string, city: string): string[] {
    return Object.keys(this.vaccineData[state]?.[city] || {});
  }
 
  isEditingRow(state: string, city: string, vaccine: string): boolean {
    return !!(
      this.editingRow &&
      this.editingRow.state === state &&
      this.editingRow.city === city &&
      this.editingRow.vaccine === vaccine
    );
  }
 
  startEditing(state: string, city: string, vaccine: string): void {
    this.editingRow = { state, city, vaccine };
    this.editState = state;
    this.editCity = city;
    this.editVaccine = vaccine;
    this.editSlots = [...this.vaccineData[state][city][vaccine]];
  }
 
  saveRow(originalState: string, originalCity: string, originalVaccine: string): void {
    if (
      originalState !== this.editState ||
      originalCity !== this.editCity ||
      originalVaccine !== this.editVaccine
    ) {
      delete this.vaccineData[originalState][originalCity][originalVaccine];
      if (Object.keys(this.vaccineData[originalState][originalCity]).length === 0) {
        delete this.vaccineData[originalState][originalCity];
      }
      if (Object.keys(this.vaccineData[originalState]).length === 0) {
        delete this.vaccineData[originalState];
      }
    }
 
    if (!this.vaccineData[this.editState]) this.vaccineData[this.editState] = {};
    if (!this.vaccineData[this.editState][this.editCity]) this.vaccineData[this.editState][this.editCity] = {};
 
    this.vaccineData[this.editState][this.editCity][this.editVaccine] = [...this.editSlots];
    this.editingRow = null;
  }
 
  updateAvailability(): void {
    alert('✅ Availability updated successfully!');
  }
 
  startAdding() {
    this.isAdding = true;
    this.newState = '';
    this.newCity = '';
    this.newVaccine = '';
    this.newSlots = [];
  }
 
  saveNewRow() {
    if (this.newState && this.newCity && this.newVaccine && this.newSlots.length > 0) {
      if (!this.vaccineData[this.newState]) {
        this.vaccineData[this.newState] = {};
      }
      if (!this.vaccineData[this.newState][this.newCity]) {
        this.vaccineData[this.newState][this.newCity] = {};
      }
      this.vaccineData[this.newState][this.newCity][this.newVaccine] = [...this.newSlots];
 
      this.isAdding = false;
      this.newState = '';
      this.newCity = '';
      this.newVaccine = '';
      this.newSlots = [];
    } else {
      alert('Please fill in all fields before saving.');
    }
  }
 
  cancelAdd() {
    this.isAdding = false;
    this.newState = '';
    this.newCity = '';
    this.newVaccine = '';
    this.newSlots = [];
  }
 
  cancelEdit() {
    this.editingRow = null;
    this.editSlots = [];
  }
 
  deleteRow(state: string, city: string, vaccine: string) {
    if (confirm(`Are you sure you want to delete ${vaccine} in ${city}, ${state}?`)) {
      delete this.vaccineData[state][city][vaccine];
      if (Object.keys(this.vaccineData[state][city]).length === 0) {
        delete this.vaccineData[state][city];
      }
      if (Object.keys(this.vaccineData[state]).length === 0) {
        delete this.vaccineData[state];
      }
    }
  }
}
