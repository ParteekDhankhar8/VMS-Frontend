import { Component } from '@angular/core';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent {
users = [
    { name: 'Alice Sharma', email: 'alice@example.com', city: 'Delhi', state: 'Delhi' },
    { name: 'Bob Mehta', email: 'bob@example.com', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Charlie Das', email: 'charlie@example.com', city: 'Bangalore', state: 'Karnataka' }
  ];
 
  viewProfile(user: any) {
    alert(`Viewing profile for ${user.name}`);
  }
 
  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(index, 1);
    }
  }
}
