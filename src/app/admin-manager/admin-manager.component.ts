import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteVaccineService } from '../services/deletevaccine.service';

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
  searchText: string = '';

  constructor(private http: HttpClient, private deleteVaccineService: DeleteVaccineService) {}

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

  get filteredVaccines() {
    if (!this.searchText) return this.vaccines;
    const search = this.searchText.toLowerCase();
    return this.vaccines.filter(v =>
      Object.values(v).some(val =>
        val && val.toString().toLowerCase().includes(search)
      )
    );
  }

  deleteVaccine(vaccineId: number, index: number) {
    if (!confirm('Are you sure you want to delete this vaccine?')) return;
    this.deleteVaccineService.deleteVaccine(vaccineId, 1).subscribe({
      next: () => {
        this.vaccines.splice(index, 1);
        alert('Vaccine deleted successfully.');
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Failed to delete vaccine. Admin access required or session expired. Please login as admin.');
        } else if (err.status === 200 || err.status === 204) {
          this.vaccines.splice(index, 1);
          alert('Vaccine deleted successfully.');
        } else {
          alert('Failed to delete vaccine.');
        }
        console.error('Delete vaccine error:', err);
      }
    });
  }
}
