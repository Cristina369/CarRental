import { Component, OnDestroy } from '@angular/core';
import { Car } from '../models/car.model';
import { Observable, Subscription } from 'rxjs';
import { CarService } from '../service/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnDestroy {
  id: string | null = null;
  cars$?: Observable<Car[]>;

  deleteCarSubscription?: Subscription;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.cars$ = this.carService.getAllCars();

    this.cars$.subscribe((cars) => {
      cars.forEach((car) => {
        if (car.locationId && car.modelName) {
        } else {
          console.log('Car Model or Location is undefined or null');
        }
      });
    });
  }

  onDelete(id: string): void {
    if (id) {
      this.deleteCarSubscription = this.carService.deleteCar(id).subscribe({
        next: (response) => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/cars']);
            });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.deleteCarSubscription?.unsubscribe();
  }
}
