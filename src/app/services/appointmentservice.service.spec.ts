// import { TestBed } from '@angular/core/testing';

// import { AppointmentserviceService } from './appointmentservice.service';

// describe('AppointmentserviceService', () => {
//   let service: AppointmentserviceService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AppointmentserviceService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentserviceService {
  getNextAppointment() {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}