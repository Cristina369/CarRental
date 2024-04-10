import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car.model';
import { UpdateCarRequest } from '../models/update-car.model';
import { AddCarRequest } from '../models/add-car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  createCar(model: AddCarRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/Car/Add?addAuth=true`,
      model
    );
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${environment.apiBaseUrl}/Car/Edit/${id}`);
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.apiBaseUrl}/Car/List`);
  }

  getCarsByType(type: string): Observable<Car[]> {
    return this.http.get<Car[]>(
      `${environment.apiBaseUrl}/Car/GetCarsByType?type=${type}`
    );
  }

  updateCar(id: string, updateCar: UpdateCarRequest): Observable<Car> {
    return this.http.put<Car>(
      `${environment.apiBaseUrl}/Car/Edit/${id}?addAuth=true`,
      updateCar
    );
  }

  deleteCar(id: string): Observable<Car> {
    return this.http.delete<Car>(
      `${environment.apiBaseUrl}/Car/Delete/${id}?addAuth=true`
    );
  }
}
