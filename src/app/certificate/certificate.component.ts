// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-certificate',
//   templateUrl: './certificate.component.html',
//   styleUrls: ['./certificate.component.css']
// })
// export class CertificateComponent {

// }


// src/app/certificate/certificate.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html'
})
export class CertificateComponent implements OnInit {
  bookings: any[] = [];
  currentUserId = 101; // Replace with actual logged-in user ID

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.http.get<any[]>(`https://localhost:7080/api/vaccination/user/${this.currentUserId}`)
      .subscribe(data => this.bookings = data);
  }

  downloadCertificate(booking: any) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Vaccination Certificate', 20, 20);

    doc.setFontSize(12);
    doc.text(`User ID: ${this.currentUserId}`, 20, 40);
    doc.text(`Vaccine: ${booking.vaccineName}`, 20, 50);
    doc.text(`Date: ${new Date(booking.slotDate).toDateString()}`, 20, 60);
    doc.text(`Status: ${booking.status}`, 20, 70);

    doc.save('Vaccination_Certificate.pdf');
  }
}
