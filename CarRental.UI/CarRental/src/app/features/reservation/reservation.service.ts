import { Injectable } from '@angular/core';
import { AddCarRequest } from '../car/models/add-car.model';
import { Observable } from 'rxjs';
import { AddReservationRequest } from './models/add-reservation.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation } from './models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  createReservation(model: AddReservationRequest): Observable<void> {
    console.log('MODEL:' + JSON.stringify(model));
    return this.http.post<void>(
      `${environment.apiBaseUrl}/CarReservation/Add`,
      model
    );
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(
      `${environment.apiBaseUrl}/CarReservation/Edit/${id}`
    );
  }

  getReservationByUser(userEmail: string): Observable<Reservation[]> {
    console.log('USER EMAIL: ' + typeof userEmail);
    return this.http.get<Reservation[]>(
      `${environment.apiBaseUrl}/CarReservation/GetReservationByUser?userEmail=${userEmail}`
    );
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      `${environment.apiBaseUrl}/CarReservation/List`
    );
  }

  deleteReservation(id: string): Observable<Reservation> {
    return this.http.delete<Reservation>(
      `${environment.apiBaseUrl}/CarReservation/Delete/${id}`
    );
  }
}
