import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointmentservice.service';

interface Appointment {
  nextAppointment: string;
  vaccineName: string;
  dateOfAppointment: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointment?: Appointment;
  loading = false;
  error = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchNextAppointment();
  }

  fetchNextAppointment() {
    this.loading = true;
    this.error = '';
    this.appointmentService.getNextAppointment().subscribe({
      next: (data: Appointment) => {
        this.appointment = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load appointment.';
        this.loading = false;
      }
    });
  }
}