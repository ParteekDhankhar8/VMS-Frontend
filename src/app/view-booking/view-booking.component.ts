import { Component } from '@angular/core';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent {
userBookings = [
    { name: 'Alice', vaccine: 'Covaxin', date: '2025-06-25', time: '09:00 AM', location: 'Chennai' },
    { name: 'John', vaccine: 'Covishield', date: '2025-06-26', time: '10:00 AM', location: 'Delhi' }
  ];
 
  familyBookings = [
    { name: 'Bob', relation: 'Father', vaccine: 'Polio', date: '2025-06-27', time: '11:00 AM', location: 'Hyderabad' },
    { name: 'Emma', relation: 'Mother',vaccine: 'BCG', date: '2025-06-28', time: '12:00 PM', location: 'Bangalore' }
  ];
 
  deleteUserBooking(index: number) {
    this.userBookings.splice(index, 1);
  }
 
  deleteFamilyBooking(index: number) {
    this.familyBookings.splice(index, 1);
  }
}
