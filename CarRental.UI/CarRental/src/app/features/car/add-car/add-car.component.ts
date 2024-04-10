import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCarRequest } from '../models/add-car.model';
import { Observable, Subscription } from 'rxjs';
import { CarService } from '../service/car.service';
import { Router } from '@angular/router';
import { ModelService } from '../../model/services/model.service';
import { LocationService } from '../../location/service/location.service';
import { Model } from '../../model/models/model.model';
import { Location } from '../../location/models/location.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  model: AddCarRequest;
  models$?: Observable<Model[]>;
  locations$?: Observable<Location[]>;

  constructor(
    private carService: CarService,
    private router: Router,
    private modelService: ModelService,
    private locationService: LocationService
  ) {
    this.model = {
      price: 0,
      year: 0,
      type: '',
      description: '',
      imageCar: '',
      available: false,
      selectedModel: '',
      selectedLocation: '',
    };
  }

  ngOnInit(): void {
    this.models$ = this.modelService.getAllModels();
    this.locations$ = this.locationService.getAllLocations();
  }

  onFormSubmit(): void {
    this.carService.createCar(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/cars');
      },
    });
  }
}
