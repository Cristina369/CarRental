import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from '../models/result.model';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location-result.model';
import { SearchRequest } from '../models/search.model';
import { Car } from '../../car/models/car.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Location[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Location[]>(
        `${environment.apiBaseUrl}/Home/GetMatchingLocations?locationSearch=${term}`
      )
      .pipe(catchError(this.handleError<Location[]>('search', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  searchAvailability(model: SearchRequest): Observable<Car[]> {
    const url =
      `${environment.apiBaseUrl}/Home/Search?` +
      `PickupDate=${model.pickupDate.toString()}&` +
      `ReturnDate=${model.returnDate.toString()}&` +
      `PickupLocation=${model.pickupLocation.id}&` +
      `ReturnLocation=${model.returnLocation.id}`;

    return this.http.get<Car[]>(url);
  }

  searchCars(searchTerm: string, carType?: string): Observable<Car[]> {
    let params = new HttpParams().set('searchTerm', searchTerm);
    if (carType) {
      params = params.set('carType', carType);
    }
    return this.http.get<Car[]>('/Cars/GetCarsByType', { params });
  }
}
export { SearchResult };
