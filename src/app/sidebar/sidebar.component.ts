import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isEditMode = false;

  // User data fields
  user = {
    name: '',
    patientId: '',
    state: '',
    city: '',
    email: '',
    phone: '',
    age: '',
    gender: ''
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