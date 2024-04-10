import { Component, OnInit } from '@angular/core';
import { AddReservationRequest } from '../models/add-reservation.model';
import { Observable } from 'rxjs';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation.model';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent implements OnInit {
  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
