import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from '../service/location.service';
import { Location } from '../models/location.model';
import { UpdateLocationRequest } from '../models/update-location.model';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
})
export class EditLocationComponent implements OnInit, OnDestroy {
  id: string | null = null;
  location?: Location;

  routeSubscription?: Subscription;
  editLocationSubscription?: Subscription;
  getLocationSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.getLocationSubscription = this.locationService
            .getLocationById(this.id)
            .subscribe({
              next: (response) => {
                this.location = response;
              },
            });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateLocationRequest: UpdateLocationRequest = {
      name: this.location?.name ?? '',
      city: this.location?.city ?? '',
      street: this.location?.street ?? '',
      phone: this.location?.phone ?? '',
    };

    if (this.id) {
      this.locationService
        .updateLocation(this.id, updateLocationRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/locations');
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.locationService.deleteLocation(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/locations');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.getLocationSubscription?.unsubscribe();
    this.editLocationSubscription?.unsubscribe();
    this.getLocationSubscription?.unsubscribe();
  }
}
