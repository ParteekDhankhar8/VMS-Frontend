import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isEditMode = false;
  currentUser = localStorage.getItem('currentUser')

  // User data fields
  user = {
    name: JSON.parse(this.currentUser || '{}').fullName || '',
    patientId: JSON.parse(this.currentUser || '{}').userId || '',
    state: JSON.parse(this.currentUser || '{}').state || '',
    city: JSON.parse(this.currentUser || '{}').city || '',
    email: JSON.parse(this.currentUser || '{}').email || '',
    phone: JSON.parse(this.currentUser || '{}').phone || '',
    age: JSON.parse(this.currentUser || '{}').age || '',
    gender: JSON.parse(this.currentUser || '{}').gender || '',
  };

  // Toggle edit mode
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  // Save changes and exit edit mode
  saveProfile() {
    this.isEditMode = false;
    // Optionally, add logic to persist changes (API call)
  }

  // Fetch user data from backend in ngOnInit and assign to this.user
  ngOnInit() {
    // this.user = fetchDataFromBackend();
  }
}