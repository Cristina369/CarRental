import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit, OnDestroy {
  id: string | null = null;
  reservations$?: Observable<Reservation[]>;

  deleteReservationSubscription?: Subscription;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (response) => {
        this.reservations$ = this.reservationService.getAllReservations();
      },
    });
  }

  onDelete(id: string): void {
    if (id) {
      this.deleteReservationSubscription = this.reservationService
        .deleteReservation(id)
        .subscribe({
          next: (response) => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/reservations']);
              });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.deleteReservationSubscription?.unsubscribe();
  }
}
