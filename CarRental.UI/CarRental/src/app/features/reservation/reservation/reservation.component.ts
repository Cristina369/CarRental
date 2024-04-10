import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../../search/models/search.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../car/service/car.service';
import { Car } from '../../car/models/car.model';
import { ReservationService } from '../reservation.service';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { AddReservationRequest } from '../models/add-reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  user?: User;
  searchRequest!: SearchRequest;
  car: Car | undefined;
  currentStep: number = 1;
  carDetails: any;
  rentalDays: number | undefined;
  finalPrice: number | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private carService: CarService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchRequest = history.state?.searchRequest || null;
      this.car = history.state?.car;
      if (this.car) {
        this.fetchCarDetails(this.car);
      }

      this.calculateRentalDays();
      this.calculateFinalPrice();
    });

    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
  }

  fetchCarDetails(car: Car): Promise<void> {
    return new Promise<void>((resolve) => {
      this.carService.getCarById(car.id).subscribe((details: any) => {
        this.carDetails = details;
        resolve();
      });
    });
  }

  calculateRentalDays(): void {
    if (
      this.searchRequest &&
      this.searchRequest.pickupDate &&
      this.searchRequest.returnDate
    ) {
      const pickupDate = new Date(this.searchRequest.pickupDate);
      const returnDate = new Date(this.searchRequest.returnDate);
      const timeDifference = returnDate.getTime() - pickupDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      this.rentalDays = Math.ceil(daysDifference);
    }
  }

  calculateFinalPrice(): void {
    if (typeof this.rentalDays !== 'undefined' && this.car) {
      if (this.rentalDays === 0) {
        this.finalPrice = this.car.price;
      } else {
        this.finalPrice = this.rentalDays * this.car.price;
      }
    } else {
      this.finalPrice = 0;
    }
  }

  makeReservation(): void {
    if (this.searchRequest && this.car && this.user) {
      const reservationData: AddReservationRequest = {
        selectedCarId: this.car.id,
        selectedUser: this.user.email,
        dateReservation: new Date().toISOString(),
        pickUpDate: new Date(this.searchRequest.pickupDate).toISOString(),
        returnDate: new Date(this.searchRequest.returnDate).toISOString(),
        selectedPickUpLocation: this.searchRequest.pickupLocation.id,
        selectedReturnLocation: this.searchRequest.returnLocation.id,
        details: '',
      };

      this.reservationService.createReservation(reservationData).subscribe(
        (response) => {
          console.log('Reservation successful:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error making reservation:', error);
        }
      );
    } else {
      console.error('Invalid reservation data');
    }
  }
}
