import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ModelListComponent } from './features/model/model-list/model-list.component';
import { AddModelComponent } from './features/model/add-model/add-model.component';
import { MakeListComponent } from './features/make/make-list/make-list.component';
import { AddMakeComponent } from './features/make/add-make/add-make.component';
import { HttpClientModule } from '@angular/common/http';
import { EditMakeComponent } from './features/make/edit-make/edit-make.component';
import { EditModelComponent } from './features/model/edit-model/edit-model.component';
import { AddLocationComponent } from './features/location/add-location/add-location.component';
import { EditLocationComponent } from './features/location/edit-location/edit-location.component';
import { LocationListComponent } from './features/location/location-list/location-list.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AddCarComponent } from './features/car/add-car/add-car.component';
import { EditCarComponent } from './features/car/edit-car/edit-car.component';
import { CarListComponent } from './features/car/car-list/car-list.component';
import { RegisterComponent } from './features/register/register/register.component';
import { SearchComponent } from './features/search/search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './features/search/search-results/search-results.component';
import { HomeComponent } from './features/home/home/home.component';
import { SearchEditComponent } from './features/search/search-edit/search-edit.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { FiltersComponent } from './features/search/filters/filters.component';
import { NouisliderModule } from 'ng2-nouislider';
import { CarDetailsComponent } from './features/car/car-details/car-details.component';
import { AddReservationComponent } from './features/reservation/add-reservation/add-reservation.component';
import { ReservationListComponent } from './features/reservation/reservation-list/reservation-list.component';
import { ReservationComponent } from './features/reservation/reservation/reservation.component';
import { PaymentComponent } from './features/reservation/payment/payment.component';
import { ReservationClientComponent } from './features/reservation/reservation-client/reservation-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/components/footer/footer.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from './shared/formats/date-formats'; // Import your custom date formats

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelListComponent,
    AddModelComponent,
    MakeListComponent,
    AddMakeComponent,
    EditMakeComponent,
    EditModelComponent,
    AddLocationComponent,
    EditLocationComponent,
    LocationListComponent,
    LoginComponent,
    AddCarComponent,
    EditCarComponent,
    CarListComponent,
    RegisterComponent,
    SearchComponent,
    SearchResultsComponent,
    HomeComponent,
    SearchEditComponent,
    ImageSelectorComponent,
    FiltersComponent,
    CarDetailsComponent,
    AddReservationComponent,
    ReservationListComponent,
    ReservationComponent,
    PaymentComponent,
    ReservationClientComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    VehiclesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NouisliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule {}
