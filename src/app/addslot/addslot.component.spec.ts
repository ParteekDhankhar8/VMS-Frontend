import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddslotComponent } from './addslot.component';

describe('AddslotComponent', () => {
  let component: AddslotComponent;
  let fixture: ComponentFixture<AddslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddslotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of vaccines', () => {
    expect(component.vaccineList).toEqual(['Covaxin', 'Covishield', 'Sputnik V', 'Pfizer', 'Moderna']);
  });
});


