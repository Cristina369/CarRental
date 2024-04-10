import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable, Subscription } from 'rxjs';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { User } from '../../auth/models/user.model';
import { of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css'],
})
export class ReservationClientComponent implements OnInit, OnDestroy {
  id: string | null = null;
  user?: User;
  reservations$?: Observable<Reservation[]>;

  getReservationSubscription?: Subscription;
  deleteReservationSubscription?: Subscription;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();

    if (this.user) {
      this.getReservationSubscription = this.reservationService
        .getReservationByUser(this.user.email.toLowerCase().toString())
        .subscribe({
          next: (reservations) => {
            this.reservations$ = of(reservations);
          },
        });
    } else {
      console.log('Invalid user');
    }
  }

  onDelete(id: string): void {
    if (id) {
      this.deleteReservationSubscription = this.reservationService
        .deleteReservation(id)
        .subscribe({
          next: () => {
            this.router.navigate(['/reservations']);
          },
          error: (error) => {
            console.error('Error deleting reservation:', error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.getReservationSubscription?.unsubscribe();
    this.deleteReservationSubscription?.unsubscribe();
  }
}
