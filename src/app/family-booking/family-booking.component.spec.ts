import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBookingComponent } from './family-booking.component';

describe('FamilyBookingComponent', () => {
  let component: FamilyBookingComponent;
  let fixture: ComponentFixture<FamilyBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
