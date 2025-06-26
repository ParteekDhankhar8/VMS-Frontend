import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvaccineComponent } from './addvaccine.component';

describe('AddvaccineComponent', () => {
  let component: AddvaccineComponent;
  let fixture: ComponentFixture<AddvaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvaccineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
