// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-addslot',
//   templateUrl: './addslot.component.html',
//   styleUrls: ['./addslot.component.css']
// })
// export class AddslotComponent {
//   vaccineData: any = {
//     Maharashtra: {
//       Pune: {
//         Covishield: ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM'],
//         Polio: ['10:00 AM - 11:00 AM']
//       },
//       Mumbai: {
//         Covishield: ['2:00 PM - 3:00 PM'],
//         Polio: []
//       }
//     },
//     Karnataka: {
//       Bangalore: {
//         Covishield: ['9:00 AM - 10:00 AM'],
//         Polio: ['10:00 AM - 11:00 AM']
//       },
//       Mysore: {
//         Covishield: [],
//         Polio: []
//       }
//     }
//   };
 
//   // Time slot options
//   slotOptions: string[] = [
//     '9:00 AM - 10:00 AM',
//     '10:00 AM - 11:00 AM',
//     '11:00 AM - 12:00 PM',
//     '2:00 PM - 3:00 PM',
//     '3:00 PM - 4:00 PM'
//   ];
 
//   editingRow: { state: string, city: string, vaccine: string } | null = null;
 
//   editState: string = '';
//   editCity: string = '';
//   editVaccine: string = '';
//   editSlots: string[] = [];
 
//   isAdding: boolean = false;
//   newState: string = '';
//   newCity: string = '';
//   newVaccine: string = '';
//   newSlots: string[] = [];
 
//   getStates(): string[] {
//     return Object.keys(this.vaccineData);
//   }
 
//   getCities(state: string): string[] {
//     return Object.keys(this.vaccineData[state] || {});
//   }
 
//   getVaccines(state: string, city: string): string[] {
//     return Object.keys(this.vaccineData[state]?.[city] || {});
//   }
 
//   isEditingRow(state: string, city: string, vaccine: string): boolean {
//     return !!(
//       this.editingRow &&
//       this.editingRow.state === state &&
//       this.editingRow.city === city &&
//       this.editingRow.vaccine === vaccine
//     );
//   }
 
//   startEditing(state: string, city: string, vaccine: string): void {
//     this.editingRow = { state, city, vaccine };
//     this.editState = state;
//     this.editCity = city;
//     this.editVaccine = vaccine;
//     this.editSlots = [...this.vaccineData[state][city][vaccine]];
//   }
 
//   saveRow(originalState: string, originalCity: string, originalVaccine: string): void {
//     if (
//       originalState !== this.editState ||
//       originalCity !== this.editCity ||
//       originalVaccine !== this.editVaccine
//     ) {
//       delete this.vaccineData[originalState][originalCity][originalVaccine];
//       if (Object.keys(this.vaccineData[originalState][originalCity]).length === 0) {
//         delete this.vaccineData[originalState][originalCity];
//       }
//       if (Object.keys(this.vaccineData[originalState]).length === 0) {
//         delete this.vaccineData[originalState];
//       }
//     }
 
//     if (!this.vaccineData[this.editState]) this.vaccineData[this.editState] = {};
//     if (!this.vaccineData[this.editState][this.editCity]) this.vaccineData[this.editState][this.editCity] = {};
 
//     this.vaccineData[this.editState][this.editCity][this.editVaccine] = [...this.editSlots];
//     this.editingRow = null;
//   }
 
//   updateAvailability(): void {
//     alert('✅ Availability updated successfully!');
//   }
 
//   startAdding() {
//     this.isAdding = true;
//     setTimeout(() => {
//       this.addSlotGroupSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
//     }, 0);
//   }
 
//   saveNewRow() {
//     if (this.newState && this.newCity && this.newVaccine && this.newSlots.length > 0) {
//       if (!this.vaccineData[this.newState]) {
//         this.vaccineData[this.newState] = {};
//       }
//       if (!this.vaccineData[this.newState][this.newCity]) {
//         this.vaccineData[this.newState][this.newCity] = {};
//       }
//       this.vaccineData[this.newState][this.newCity][this.newVaccine] = [...this.newSlots];
 
//       this.isAdding = false;
//       this.newState = '';
//       this.newCity = '';
//       this.newVaccine = '';
//       this.newSlots = [];
//     } else {
//       alert('Please fill in all fields before saving.');
//     }
//   }
 
//   cancelAdd() {
//     this.isAdding = false;
//     this.newState = '';
//     this.newCity = '';
//     this.newVaccine = '';
//     this.newSlots = [];
//   }
 
//   cancelEdit() {
//     this.editingRow = null;
//     this.editSlots = [];
//   }
 
//   deleteRow(state: string, city: string, vaccine: string) {
//     if (confirm(`Are you sure you want to delete ${vaccine} in ${city}, ${state}?`)) {
//       delete this.vaccineData[state][city][vaccine];
//       if (Object.keys(this.vaccineData[state][city]).length === 0) {
//         delete this.vaccineData[state][city];
//       }
//       if (Object.keys(this.vaccineData[state]).length === 0) {
//         delete this.vaccineData[state];
//       }
//     }
//   }
// }



import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-addslot',
  templateUrl: './addslot.component.html',
  styleUrls: ['./addslot.component.css']
})
export class AddslotComponent implements OnInit {

   vaccineList: string[] = ['Covishield', 'Polio'];
  // vaccineList                                    //         Covishield: [],
  //   (vaccineList: any) {
  //     throw new Error('Method not implemented.');
  // }
  vaccineData: any = {};
  vaccineDates: any = {};
  vaccineAvailability: any = {};

  slotOptions: string[] = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '2:00 PM',
    '3:00 PM'
  ];

  editingRow: { state: string, city: string, vaccine: string } | null = null;
  editState: string = '';
  editCity: string = '';
  editVaccine: string = '';
  editSlots: string[] = [];
  editDate: string = '';
  editAvailability: boolean = true;

  isAdding: boolean = false;
  newState: string = '';
  newCity: string = '';
  newVaccine: string = '';
  newSlots: string[] = [];
  newDate: string = '';
  newAvailability: boolean = true;

  vaccineSlotList: {
    state: string;
    city: string;
    vaccine: string;
    slot: string;
    date: string;
    availability: boolean;
  }[] = [];

  @ViewChild('addSlotGroupSection') addSlotGroupSection!: ElementRef;
  @ViewChild('topSection') topSection!: ElementRef;

  ngOnInit(): void {
    this.vaccineData = {
      Maharashtra: {
        Pune: {
          Covishield: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
          Polio: ['10:00 AM', '11:00 AM']
        },
        Mumbai: {
          Covishield: ['2:00 PM', '3:00 PM'],
          Polio: []
        }
      },
      Karnataka: {
        Bangalore: {
          Covishield: ['9:00 AM', '10:00 AM'],
          Polio: ['10:00 AM', '11:00 AM']
        },
        Mysore: {
          Covishield: [],
          Polio: []
        }
      }
    };

    this.vaccineDates = {
      Maharashtra: {
        Pune: {
          Covishield: '2025-06-25',
          Polio: '2025-06-25'
        },
        Mumbai: {
          Covishield: '2025-06-25',
          Polio: '2025-06-25'
        }
      },
      Karnataka: {
        Bangalore: {
          Covishield: '2025-06-25',
          Polio: '2025-06-25'
        },
        Mysore: {
          Covishield: '2025-06-25',
          Polio: '2025-06-25'
        }
      }
    };

    this.vaccineAvailability = {
      Maharashtra: {
        Pune: {
          Covishield: true,
          Polio: true
        },
        Mumbai: {
          Covishield: true,
          Polio: true
        }
      },
      Karnataka: {
        Bangalore: {
          Covishield: true,
          Polio: true
        },
        Mysore: {
          Covishield: true,
          Polio: true
        }
      }
    };

    this.flattenVaccineData();
  }

  flattenVaccineData() {
    this.vaccineSlotList = [];

    for (const state of Object.keys(this.vaccineData)) {
      for (const city of Object.keys(this.vaccineData[state])) {
        for (const vaccine of Object.keys(this.vaccineData[state][city])) {
          const slots = this.vaccineData[state][city][vaccine] || [];
          const date = this.vaccineDates[state][city][vaccine];
          const available = this.vaccineAvailability[state][city][vaccine];

          for (const slot of slots) {
            this.vaccineSlotList.push({
              state,
              city,
              vaccine,
              slot,
              date,
              availability: available
            });
          }
        }
      }
    }
  }

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
    this.editDate = this.vaccineDates[state][city][vaccine];
    this.editAvailability = this.vaccineAvailability[state][city][vaccine];
  }

  saveRow(originalState: string, originalCity: string, originalVaccine: string): void {
    if (
      originalState !== this.editState ||
      originalCity !== this.editCity ||
      originalVaccine !== this.editVaccine
    ) {
      delete this.vaccineData[originalState][originalCity][originalVaccine];
      delete this.vaccineDates[originalState][originalCity][originalVaccine];
      delete this.vaccineAvailability[originalState][originalCity][originalVaccine];

      if (Object.keys(this.vaccineData[originalState][originalCity]).length === 0) {
        delete this.vaccineData[originalState][originalCity];
        delete this.vaccineDates[originalState][originalCity];
        delete this.vaccineAvailability[originalState][originalCity];
      }

      if (Object.keys(this.vaccineData[originalState]).length === 0) {
        delete this.vaccineData[originalState];
        delete this.vaccineDates[originalState];
        delete this.vaccineAvailability[originalState];
      }
    }

    if (!this.vaccineData[this.editState]) {
      this.vaccineData[this.editState] = {};
      this.vaccineDates[this.editState] = {};
      this.vaccineAvailability[this.editState] = {};
    }

    if (!this.vaccineData[this.editState][this.editCity]) {
      this.vaccineData[this.editState][this.editCity] = {};
      this.vaccineDates[this.editState][this.editCity] = {};
      this.vaccineAvailability[this.editState][this.editCity] = {};
    }

    this.vaccineData[this.editState][this.editCity][this.editVaccine] = [...this.editSlots];
    this.vaccineDates[this.editState][this.editCity][this.editVaccine] = this.editDate;
    this.vaccineAvailability[this.editState][this.editCity][this.editVaccine] = this.editAvailability;

    this.editingRow = null;
    this.flattenVaccineData();
  }

  startAdding() {
    this.isAdding = true;
    setTimeout(() => {
      this.addSlotGroupSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  saveNewRow() {
    if (this.newState && this.newCity && this.newVaccine && this.newSlots.length > 0 && this.newDate) {
      if (!this.vaccineData[this.newState]) {
        this.vaccineData[this.newState] = {};
        this.vaccineDates[this.newState] = {};
        this.vaccineAvailability[this.newState] = {};
      }

      if (!this.vaccineData[this.newState][this.newCity]) {
        this.vaccineData[this.newState][this.newCity] = {};
        this.vaccineDates[this.newState][this.newCity] = {};
        this.vaccineAvailability[this.newState][this.newCity] = {};
      }

      this.vaccineData[this.newState][this.newCity][this.newVaccine] = [...this.newSlots];
      this.vaccineDates[this.newState][this.newCity][this.newVaccine] = this.newDate;
      this.vaccineAvailability[this.newState][this.newCity][this.newVaccine] = this.newAvailability;

      this.isAdding = false;
      this.newState = '';
      this.newCity = '';
      this.newVaccine = '';
      this.newSlots = [];
      this.newDate = '';
      this.newAvailability = true;

      this.flattenVaccineData();
    } else {
      alert('Please fill in all fields before saving.');
    }
  }

  cancelAdd() {
    this.isAdding = false;
    setTimeout(() => {
      this.topSection?.nativeElement.scrollIntoView();
    }, 100);
  }

  cancelEdit() {
    this.editingRow = null;
    this.editSlots = [];
    this.editDate = '';
    this.editAvailability = true;
  }

  deleteRow(state: string, city: string, vaccine: string) {
    if (confirm(`Are you sure you want to delete ${vaccine} in ${city}, ${state}?`)) {
      delete this.vaccineData[state][city][vaccine];
      delete this.vaccineDates[state][city][vaccine];
      delete this.vaccineAvailability[state][city][vaccine];

      if (Object.keys(this.vaccineData[state][city]).length === 0) {
        delete this.vaccineData[state][city];
        delete this.vaccineDates[state][city];
        delete this.vaccineAvailability[state][city];
      }

      if (Object.keys(this.vaccineData[state]).length === 0) {
        delete this.vaccineData[state];
        delete this.vaccineDates[state];
        delete this.vaccineAvailability[state];
      }

      this.flattenVaccineData();
    }
  }

  updateAvailability(): void {
    alert('✅ Availability updated successfully!');
  }
}

