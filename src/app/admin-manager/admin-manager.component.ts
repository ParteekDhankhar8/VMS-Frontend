import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Vaccine {
  vaccineId: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit {
  vaccines: Vaccine[] = [];
  vaccineError: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVaccines();
  }

  fetchVaccines() {
    this.vaccineError = '';
    this.http.get<Vaccine[]>(
      'https://f1h42csw-5136.inc1.devtunnels.ms/api/Vaccine?adminUserId=1',
      { responseType: 'json' }
    ).subscribe({
      next: (data) => {
        this.vaccines = data;
      },
      error: (err) => {
        this.vaccineError = 'Failed to fetch vaccines.';
        console.error('Vaccine fetch error:', err);
      }
    });
  }
}
