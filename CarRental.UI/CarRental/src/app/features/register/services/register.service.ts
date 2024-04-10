import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(model: User): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/Account/Register`,
      model
    );
  }
}
