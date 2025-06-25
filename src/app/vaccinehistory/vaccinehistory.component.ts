import { Component } from '@angular/core';

@Component({
  selector: 'app-vaccinehistory',
  templateUrl: './vaccinehistory.component.html',
  styleUrls: ['./vaccinehistory.component.css']
})
export class VaccinehistoryComponent {

vaccinationData = [
    { name: 'Covaxin', date: '2025-06-01', status: 'Taken' },
    { name: 'Covishield', date: '2025-06-15', status: 'Remaining' },
    { name: 'Sputnik', date: '2025-05-20', status: 'Deleted' },
 { name: 'Covax', date: '2025-06-01', status: 'Taken' },
    { name: 'Covis', date: '2025-06-15', status: 'Taken' },
    { name: 'Sputnik', date: '2025-05-20', status: 'Deleted' } ];

currentIndex = 0;

nextPage() {
  if (this.currentIndex + 3 < this.vaccinationData.length) {
    this.currentIndex += 3;
  }
}

prevPage() {
  if (this.currentIndex - 3 >= 0) {
    this.currentIndex -= 3;
  }
}

}