import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddLocationRequest } from '../models/add-location.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';
import { UpdateLocationRequest } from '../models/update-location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  addLocation(model: AddLocationRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/Location/Add?addAuth=true`,
      model
    );
  }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiBaseUrl}/Location/List`);
  }

  getLocationById(id: string): Observable<Location> {
    return this.http.get<Location>(
      `${environment.apiBaseUrl}/Location/Edit/${id}`
    );
  }

  updateLocation(
    id: string,
    updateLocationRequest: UpdateLocationRequest
  ): Observable<Location> {
    return this.http.put<Location>(
      `${environment.apiBaseUrl}/Location/Edit/${id}?addAuth=true`,
      updateLocationRequest
    );
  }

  deleteLocation(id: string): Observable<Location> {
    return this.http.delete<Location>(
      `${environment.apiBaseUrl}/Location/Delete/${id}?addAuth=true`
    );
  }
}
