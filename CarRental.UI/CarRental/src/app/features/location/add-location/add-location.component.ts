import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddLocationRequest } from '../models/add-location.model';
import { Subscription } from 'rxjs';
import { LocationService } from '../service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnDestroy {
  model: AddLocationRequest;
  private addLocationSubscription?: Subscription;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {
    this.model = {
      name: '',
      city: '',
      street: '',
      phone: '',
    };
  }

  onFormSubmit() {
    this.addLocationSubscription = this.locationService
      .addLocation(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/locations');
        },
      });
  }

  ngOnDestroy(): void {
    this.addLocationSubscription?.unsubscribe();
  }
}
