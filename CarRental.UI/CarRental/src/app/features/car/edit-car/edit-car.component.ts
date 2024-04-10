import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { Model } from '../../model/models/model.model';
import { Observable, Subscription } from 'rxjs';
import { Location } from '../../location/models/location.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../service/car.service';
import { ModelService } from '../../model/services/model.service';
import { LocationService } from '../../location/service/location.service';
import { UpdateCarRequest } from '../models/update-car.model';
import { ImageService } from 'src/app/shared/components/services/image.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css'],
})
export class EditCarComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: Car;
  models$?: Observable<Model[]>;
  selectedModel?: string;
  locations$?: Observable<Location[]>;
  selectedLocation?: string;
  isImageSelectorVisible: boolean = false;

  errorMessage: string = '';
  errorMessagePrice: string = '';
  errorMessageYear: string = '';

  routeSubscription?: Subscription;
  updateCarSubscription?: Subscription;
  getCarSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private modelService: ModelService,
    private locationService: LocationService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.models$ = this.modelService.getAllModels();
    this.locations$ = this.locationService.getAllLocations();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.getCarSubscription = this.carService
            .getCarById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedModel = response.modelId.toString();
                this.selectedLocation = response.locationId.toString();
              },
            });
        }

        this.imageSelectSubscription = this.imageService
          .onSelectImage()
          .subscribe({
            next: (response) => {
              if (this.model) {
                this.model.imageCar = response.imageUrl;
                this.isImageSelectorVisible = false;
              }
            },
          });
      },
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id && this.selectedModel && this.selectedLocation) {
      var updateCar: UpdateCarRequest = {
        price: this.model.price,
        year: this.model.year,
        type: this.model.type,
        description: this.model.description,
        imageCar: this.model.imageCar,
        available: this.model.available,
        selectedModel: this.selectedModel,
        selectedLocation: this.selectedLocation,
      };

      this.updateCarSubscription = this.carService
        .updateCar(this.id, updateCar)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/cars');
          },
        });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
    this.closeImageSelector();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateCarSubscription?.unsubscribe();
    this.getCarSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
