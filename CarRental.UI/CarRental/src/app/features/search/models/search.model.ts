import { Location } from '../models/location-result.model';

export interface SearchRequest {
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: Location;
  returnLocation: Location;
}
