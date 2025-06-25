import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent {
  vaccineData: any = {
    Maharashtra: {
      Pune: { Covishield: 10, Polio: 5 },
      Mumbai: { Covishield: 8, Polio: 4 }
    },
    Karnataka: {
      Bangalore: { Covishield: 12, Polio: 6 },
      Mysore: { Covishield: 9, Polio: 3 }
    }
  };
 
  editingRow: { state: string, city: string, vaccine: string } | null = null;
 
  editState: string = '';
  editCity: string = '';
  editVaccine: string = '';
  editAvailability: number = 0;
 
  // For adding new row
  isAdding: boolean = false;
  newState: string = '';
  newCity: string = '';
  newVaccine: string = '';
  newAvailability: number | null = null;
 
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
    this.editAvailability = this.vaccineData[state][city][vaccine];
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
 
    this.vaccineData[this.editState][this.editCity][this.editVaccine] = this.editAvailability;
    this.editingRow = null;
  }
 
  // deleteRow(state: string, city: string, vaccine: string): void {
  //   delete this.vaccineData[state][city][vaccine];
  //   if (Object.keys(this.vaccineData[state][city]).length === 0) {
  //     delete this.vaccineData[state][city];
  //   }
  //   if (Object.keys(this.vaccineData[state]).length === 0) {
  //     delete this.vaccineData[state];
  //   }
  // }
 
  updateAvailability(): void {
    alert('✅ Availability updated successfully!');
  }
 
  startAdding() {
  this.isAdding = true;
  this.newState = '';
  this.newCity = '';
  this.newVaccine = '';
  this.newAvailability = null;
}
 
saveNewRow() {
  if (this.newState && this.newCity && this.newVaccine && this.newAvailability !== null) {
    if (!this.vaccineData[this.newState]) {
      this.vaccineData[this.newState] = {};
    }
    if (!this.vaccineData[this.newState][this.newCity]) {
      this.vaccineData[this.newState][this.newCity] = {};
    }
    this.vaccineData[this.newState][this.newCity][this.newVaccine] = this.newAvailability;
 
    this.isAdding = false;
    this.newState = '';
    this.newCity = '';
    this.newVaccine = '';
    this.newAvailability = null;
  } else {
    alert('Please fill in all fields before saving.');
  }
}
 
cancelAdd() {
  this.isAdding = false;
  this.newState = '';
  this.newCity = '';
  this.newVaccine = '';
  this.newAvailability = null;
}
 
cancelEdit() {
  this.editingRow = null;
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
