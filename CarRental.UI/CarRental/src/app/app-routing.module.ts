import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelListComponent } from './features/model/model-list/model-list.component';
import { AddModelComponent } from './features/model/add-model/add-model.component';
import { MakeListComponent } from './features/make/make-list/make-list.component';
import { AddMakeComponent } from './features/make/add-make/add-make.component';
import { EditMakeComponent } from './features/make/edit-make/edit-make.component';
import { EditModelComponent } from './features/model/edit-model/edit-model.component';
import { LocationListComponent } from './features/location/location-list/location-list.component';
import { AddLocationComponent } from './features/location/add-location/add-location.component';
import { EditLocationComponent } from './features/location/edit-location/edit-location.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CarListComponent } from './features/car/car-list/car-list.component';
import { AddCarComponent } from './features/car/add-car/add-car.component';
import { EditCarComponent } from './features/car/edit-car/edit-car.component';
import { RegisterComponent } from './features/register/register/register.component';
import { SearchComponent } from './features/search/search/search.component';
import { SearchResultsComponent } from './features/search/search-results/search-results.component';
import { HomeComponent } from './features/home/home/home.component';
import { SearchEditComponent } from './features/search/search-edit/search-edit.component';
import { AddReservationComponent } from './features/reservation/add-reservation/add-reservation.component';
import { ReservationComponent } from './features/reservation/reservation/reservation.component';
import { PaymentComponent } from './features/reservation/payment/payment.component';
import { ReservationListComponent } from './features/reservation/reservation-list/reservation-list.component';
import { ReservationClientComponent } from './features/reservation/reservation-client/reservation-client.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { VehiclesComponent } from './features/vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'search-results',
    component: SearchResultsComponent,
  },
  {
    path: 'search-edit',
    component: SearchEditComponent,
  },
  {
    path: 'rent/:id',
    component: ReservationComponent,
  },
  {
    path: 'rent/add-reservation/:id',
    component: AddReservationComponent,
  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
  },
  {
    path: 'reservations',
    component: ReservationClientComponent,
  },
  {
    path: 'admin/reservations',
    component: ReservationListComponent,
  },
  {
    path: 'admin/models',
    component: ModelListComponent,
  },
  {
    path: 'admin/models/add',
    component: AddModelComponent,
  },
  {
    path: 'admin/models/:id',
    component: EditModelComponent,
  },
  {
    path: 'admin/makes',
    component: MakeListComponent,
  },
  {
    path: 'admin/makes/add',
    component: AddMakeComponent,
  },
  {
    path: 'admin/makes/:id',
    component: EditMakeComponent,
  },
  {
    path: 'admin/locations',
    component: LocationListComponent,
  },
  {
    path: 'admin/locations/add',
    component: AddLocationComponent,
  },
  {
    path: 'admin/locations/:id',
    component: EditLocationComponent,
  },
  {
    path: 'admin/cars',
    component: CarListComponent,
  },
  {
    path: 'admin/cars/add',
    component: AddCarComponent,
  },
  {
    path: 'admin/cars/:id',
    component: EditCarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
