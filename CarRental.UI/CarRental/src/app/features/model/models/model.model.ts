import { Make } from '../../make/models/make.model';

export interface Model {
  id: string;
  name: string;
  description: string;
  makeName: string;
  makeId: Make;
  carCount: string;
}
