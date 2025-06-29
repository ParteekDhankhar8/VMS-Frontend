import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
 selectedTab: string = 'bookings';
 
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
