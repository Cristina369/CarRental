import { Injectable } from '@angular/core';
import { Make } from '../models/make.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddMakeRequest } from '../models/add-model.model';
import { UpdateLocationRequest } from '../../location/models/update-location.model';

@Injectable({
  providedIn: 'root',
})
export class MakeService {
  constructor(private http: HttpClient) {}

  addMake(model: AddMakeRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/Make/Add?addAuth=true`,
      model
    );
  }

  getAllMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(`${environment.apiBaseUrl}/Make/List`);
  }

  getMakeById(id: string): Observable<Make> {
    return this.http.get<Make>(`${environment.apiBaseUrl}/Make/${id}`);
  }

  deleteMake(id: string): Observable<Make> {
    return this.http.delete<Make>(
      `${environment.apiBaseUrl}/Make/Delete/${id}?addAuth=true`
    );
  }
}
