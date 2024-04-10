import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddModel } from '../models/add-model.model';
import { environment } from 'src/environments/environment';
import { Model } from '../models/model.model';
import { Observable } from 'rxjs';
import { UpdateModel } from '../models/update-model.model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  getMakeById(makeId: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  createModel(model: AddModel): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/Model/Add?addAuth=true`,
      model
    );
  }

  getModelById(id: string): Observable<Model> {
    return this.http.get<Model>(`${environment.apiBaseUrl}/Model/Edit/${id}`);
  }

  getAllModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${environment.apiBaseUrl}/Model/List`);
  }

  updateModel(id: string, updateModel: UpdateModel): Observable<Model> {
    return this.http.put<Model>(
      `${environment.apiBaseUrl}/Model/Edit/${id}?addAuth=true`,
      updateModel
    );
  }

  deleteModel(id: string): Observable<Model> {
    return this.http.delete<Model>(
      `${environment.apiBaseUrl}/Model/Delete/${id}?addAuth=true`
    );
  }
}
