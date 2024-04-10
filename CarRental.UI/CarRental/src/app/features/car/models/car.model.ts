import { Location } from '../../location/models/location.model';
import { Model } from '../../model/models/model.model';

export interface Car {
  id: string;
  price: number;
  year: number;
  type: string;
  description: string;
  imageCar: string;
  available: boolean;
  modelId: Model;
  modelName: string;
  makeName: string;
  locationId: Location;
  locationName: string;
}
