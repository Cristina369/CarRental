import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/car-image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<CarImage> = new BehaviorSubject<CarImage>({
    imageUrl: '',
    title: '',
  });

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<CarImage[]> {
    return this.http.get<CarImage[]>(
      `${environment.apiBaseUrl}/Images/GetAllImages`
    );
  }

  uploadImage(file: File, title: string): Observable<CarImage> {
    if (!file) {
      return throwError('No file selected');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    const headers = new HttpHeaders();

    return this.http
      .post<CarImage>(
        `${environment.apiBaseUrl}/Images/UploadAsync`,
        formData,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error uploading image:', error);
          return throwError('Failed to upload image');
        })
      );
  }

  selectImage(image: CarImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<CarImage> {
    return this.selectedImage.asObservable();
  }
}
