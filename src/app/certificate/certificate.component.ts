// import { Component } from '@angular/core};

// @Component({
//   selector: 'app-certificate',
//   templateUrl: './certificate.component.html',
//   styleUrls: ['./certificate.component.css']
// })
// export class CertificateComponent {

// }


// src/app/certificate/certificate.component.ts
import { Component} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { CertificateService } from '../services/certificate.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html'
})
export class CertificateComponent {
  @ViewChild('printSection') printSection!: ElementRef;
  @Input() memberId?: number;
  @Input() certificateId?: number;
  constructor(private certificateService: CertificateService) {}
 
  user = {
    name: 'John Doe',
    vaccineName: 'Covishield',
    vaccinationDate: '24 June 2025',
    id: 213958,
    // dose: 1,
    // totalDoses: 2,
    issuedDate: '2 July 2025'
  };
 
  printCertificate() {
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
}
