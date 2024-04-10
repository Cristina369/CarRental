import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationClientComponent } from './reservation-client.component';

describe('ReservationClientComponent', () => {
  let component: ReservationClientComponent;
  let fixture: ComponentFixture<ReservationClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationClientComponent]
    });
    fixture = TestBed.createComponent(ReservationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
