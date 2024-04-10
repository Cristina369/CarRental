import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LocationService } from '../service/location.service';
import { Router } from '@angular/router';
import { Location } from '../models/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit, OnDestroy {
  id: string | null = null;
  locations$?: Observable<Location[]>;

  deleteLocationSubscription?: Subscription;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe({
      next: (response) => {
        this.locations$ = this.locationService.getAllLocations();
      },
    });
  }

  onDelete(id: string): void {
    if (id) {
      this.deleteLocationSubscription = this.locationService
        .deleteLocation(id)
        .subscribe({
          next: (response) => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/locations']);
              });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.deleteLocationSubscription?.unsubscribe();
  }
}
