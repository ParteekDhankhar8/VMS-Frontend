import { Component } from '@angular/core';
import { RegistedFamilyService, RegisterFamilyMember } from '../services/registed-family.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {
  fullName: string = '';
  age: number = 0;
  gender: string = '';
  relation: string = '';
  userId: number = 1;
  memberId: number | null = null;
  
  currentUser: any = localStorage.getItem('currentUser');

  constructor(private registedFamilyService: RegistedFamilyService) {
    this.userId = this.currentUser ? JSON.parse(this.currentUser).userId : 1;
  }

  registerMember() {
    if (!this.fullName || !this.age || !this.gender || !this.relation) {
      alert('Please fill all details before registering.');
      return;
    }
    const member: RegisterFamilyMember = {
      memberId: 0,
      fullName: this.fullName,
      age: this.age,
      gender: this.gender,
      userId: this.userId,
      relation: this.relation
    };
    this.registedFamilyService.registerFamilyMember(member).subscribe({
      next: (response: any) => {
        alert('Family member registered successfully!');
        if (response && response.memberId) {
          this.memberId = response.memberId;
          if (this.memberId !== null) {
            localStorage.setItem('memberId', this.memberId.toString());
          }
          console.log('Registered memberId:', this.memberId);
        }
        this.fullName = '';
        this.age = 0;
        this.gender = '';
        this.relation = '';
      },
      error: () => {
        alert('Failed to register family member.');
      }
    });
  }
}
