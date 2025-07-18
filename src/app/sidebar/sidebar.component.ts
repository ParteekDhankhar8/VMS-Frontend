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
    patientId: JSON.parse(this.currentUser || '{}').userId || '', // Uneditable
    state: JSON.parse(this.currentUser || '{}').state || '',
    city: JSON.parse(this.currentUser || '{}').city || '',
    email: JSON.parse(this.currentUser || '{}').email || '',
    phone: JSON.parse(this.currentUser || '{}').phone || '',
    age: JSON.parse(this.currentUser || '{}').age || '',
    gender: JSON.parse(this.currentUser || '{}').gender || '',
  };

  profileImageUrl: string | ArrayBuffer | null = null;

  // Toggle edit mode
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  // Save changes and exit edit mode
  saveProfile() {
    this.isEditMode = false;
    // Optionally, add logic to persist changes (API call)
    if (this.profileImageUrl) {
      localStorage.setItem('profileImageUrl', typeof this.profileImageUrl === 'string' ? this.profileImageUrl : '');
    } else {
      localStorage.removeItem('profileImageUrl');
    }
  }

  // Handle profile image upload
  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove profile image
  removeProfileImage() {
    this.profileImageUrl = null;
  }

  // Fetch user data from backend in ngOnInit and assign to this.user
  ngOnInit() {
    // this.user = fetchDataFromBackend();
    const storedImage = localStorage.getItem('profileImageUrl');
    if (storedImage) {
      this.profileImageUrl = storedImage;
    }
  }
}