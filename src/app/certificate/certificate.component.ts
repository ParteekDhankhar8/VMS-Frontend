// import { Component } from '@angular/core};

// @Component({
//   selector: 'app-certificate',
//   templateUrl: './certificate.component.html',
//   styleUrls: ['./certificate.component.css']
// })
// export class CertificateComponent {

// }


// src/app/certificate/certificate.component.ts
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { CertificateService } from '../services/certificate.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html'
})
export class CertificateComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  @Input() memberId?: number;
  @Input() certificateId?: number;
  user: any = {};
  bookingId: number | null = null;

  constructor(private certificateService: CertificateService) {}

  ngOnInit() {
    // Fetch bookingId from localStorage
    const booking = localStorage.getItem('currentBooking');
    if (booking) {
      try {
        const bookingObj = JSON.parse(booking);
        this.bookingId = bookingObj.bookingId || bookingObj.id || null;
        // Use bookedFor and vaccine from localStorage if available
        this.user = {
          name: bookingObj.bookedFor || bookingObj.booked_for || bookingObj.name || bookingObj.booked_by || bookingObj.bookedBy || bookingObj.fullName || bookingObj.userName || 'N/A',
          vaccineName: bookingObj.vaccine || bookingObj.vaccineName || bookingObj.vaccine_name || 'N/A',
        };
        console.log('From localStorage - Name:', this.user.name, 'Vaccine:', this.user.vaccineName, 'Raw bookingObj:', bookingObj);
      } catch {
        this.bookingId = null;
      }
    }

    if (this.bookingId) {
      this.certificateService.getCertificateData(this.bookingId).subscribe({
        next: (data) => {
          // Prefer localStorage values, but update if backend provides them
          this.user = {
            name: this.user.name !== 'N/A' ? this.user.name : (data.bookedFor || data.fullName || data.name || data.uname || data.userName || 'N/A'),
            vaccineName: this.user.vaccineName !== 'N/A' ? this.user.vaccineName : (data.vaccine || data.vaccineName || data.vaccine_name || 'N/A'),
            id: data.certificateId || data.id || '',
            vaccinationDate: data.vaccinationDate || data.date || data.vaccinatedOn || 'N/A',
            issuedDate: data.issuedDate || new Date().toLocaleDateString()
          };
          console.log('Final certificate user:', this.user);
        },
        error: () => {
          this.user = { ...this.user, name: 'N/A', vaccineName: 'N/A' };
        }
      });
    } else if (this.memberId) {
      this.certificateService.getCertificateDataForMember(this.memberId).subscribe({
        next: (data) => {
          this.user = {
            id: data.certificateId || data.id || data.memberId || '',
            name: data.fullName || data.name || data.memberName || data.uname || data.userName || 'N/A',
            vaccineName: data.vaccineName || data.vaccine || data.vaccine_name || 'N/A',
            vaccinationDate: data.vaccinationDate || data.date || data.vaccinatedOn || 'N/A',
            issuedDate: data.issuedDate || new Date().toLocaleDateString()
          };
          console.log('Final certificate user (member):', this.user);
        },
        error: () => {
          this.user = { name: 'N/A', vaccineName: 'N/A' };
        }
      });
    } else if (this.certificateId) {
      this.certificateService.getCertificateData(this.certificateId).subscribe({
        next: (data) => {
          this.user = {
            id: data.certificateId || data.id || '',
            name: data.fullName || data.name || data.uname || data.userName || 'N/A',
            vaccineName: data.vaccineName || data.vaccine || data.vaccine_name || 'N/A',
            vaccinationDate: data.vaccinationDate || data.date || data.vaccinatedOn || 'N/A',
            issuedDate: data.issuedDate || new Date().toLocaleDateString()
          };
          console.log('Final certificate user (by ID):', this.user);
        },
        error: () => {
          this.user = { name: 'N/A', vaccineName: 'N/A' };
        }
      });
    }
  }
 
  printCertificate() {
    // Print name and vaccine in console before printing
    console.log('Certificate Name:', this.user.name, 'Vaccine:', this.user.vaccineName);
    const printContent = this.printSection.nativeElement.innerHTML;
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
 
  if (!WindowPrt) {
    alert('Please allow popups for this website');
    return;
  }
   WindowPrt.document.write(`
      <html>
        <head>
          <title>Vaccination Certificate</title>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              padding: 40px;
              background: #fff;
            }
            .certificate {
              max-width: 700px;
              margin: auto;
              padding: 40px;
              border: 2px solid #222;
              box-shadow: 0 0 10px rgba(0,0,0,0.2);
            }
            h1, h2 {
              text-align: center;
              margin: 0;
            }
            .certificate-body p {
              font-size: 16px;
              margin: 10px 0;
            }
            .footer {
              margin-top: 40px;
              display: flex;
              justify-content: space-between;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="certificate">${printContent}</div>
        </body>
      </html>
    `);
 
    WindowPrt.document.close();
    WindowPrt.focus();
 
    setTimeout(() => {
      WindowPrt.print();
      WindowPrt.close();
    }, 500);
  }

  downloadCertificate() {
    if (this.memberId) {
      this.certificateService.downloadCertificateForMember(this.memberId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'certificate.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          alert('No completed bookings found for this person.');
        }
      });
    } else if (this.certificateId) {
      this.certificateService.downloadCertificate(this.certificateId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'certificate.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          alert('Certificate not found.');
        }
      });
    } else {
      alert('No certificate information available.');
    }
  }

  // Utility to store booking info for certificate (can be called from anywhere)
  static storeBookingForCertificate(booking: any) {
    localStorage.setItem('currentBooking', JSON.stringify({
      bookingId: booking.bookingId,
      bookedFor: booking.bookedFor,
      vaccine: booking.vaccine
    }));
    console.log('Booking details saved for certificate!', booking);
  }
}
