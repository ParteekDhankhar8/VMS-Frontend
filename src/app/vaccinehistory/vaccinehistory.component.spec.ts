import { ComponentFixture, TestBed } from '@angular/core';

import { VaccinehistoryComponent } from './vaccinehistory.component';

describe('VaccinehistoryComponent', () => {
  let component: VaccinehistoryComponent;
  let fixture: ComponentFixture<VaccinehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinehistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
