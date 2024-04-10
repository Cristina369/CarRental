export interface AddCarRequest {
  price: number;
  year: number;
  type: string;
  description: string;
  imageCar: string;
  available: boolean;
  selectedModel: string;
  selectedLocation: string;
}
