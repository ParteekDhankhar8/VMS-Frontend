import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill all fields.');
      return;
    }
    alert('Thank you for contacting us! We will get back to you soon.');
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
