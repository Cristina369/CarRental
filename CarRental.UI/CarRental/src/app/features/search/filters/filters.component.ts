import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchRequest } from '../models/search.model';
import { Car } from '../../car/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  searchRequest!: SearchRequest;
  searchResults!: Car[];
  filteredResults!: Car[];

  @Output() applyFilters = new EventEmitter<any>();
  showEditComponent: boolean = false;
  selectedType!: string;

  priceListVisible: boolean = true;
  carModelsListVisible: boolean = true;
  carMakesListVisible: boolean = true;
  carTypesListVisible: boolean = true;

  modelSelections: { [key: string]: boolean } = {};
  makeSelections: { [key: string]: boolean } = {};
  typeSelections: { [key: string]: boolean } = {};

  carModels: string[] = ['X1', 'X3', 'GLB', 'GR5', '001R'];
  carTypes: string[] = ['Sedan', 'SUV', 'Coupe'];
  carMakes: string[] = [
    'Mercedes S Class',
    'BMW LL',
    'BMW',
    'Mercedes',
    'Renault',
    'Skoda',
    'Lexus',
    'Toyota',
    'Dacia',
    'Audi',
  ];

  priceModels: { label: string; min: number; max: number; checked: boolean }[] =
    [
      { label: 'RON 0 - RON 200', min: 0, max: 200, checked: false },
      { label: 'RON 200 - RON 400', min: 200, max: 400, checked: false },
      { label: 'RON 400 - RON 600', min: 400, max: 600, checked: false },
      { label: 'RON 600 - RON 800', min: 600, max: 800, checked: false },
      { label: 'RON 800 +', min: 800, max: Infinity, checked: false },
    ];

  selectedTypes: string = '';
  selectedMakes: string = '';
  selectedModels: string = '';
  selectedPrices: number = 0;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchRequest = history.state?.searchRequest;
      this.searchResults = history.state?.searchResults;
      this.filteredResults = this.searchResults;
    });
  }

  onEdit(editedSearchRequest: SearchRequest): void {
    this.searchRequest = editedSearchRequest;

    this.showEditComponent = false;
    this.updateSearchResults();
  }

  updateSearchResults() {
    const requestWithFilters = {
      ...this.searchRequest,
      carType: this.selectedType,
    };

    this.searchService.searchAvailability(requestWithFilters).subscribe(
      (results: Car[]) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error fetching updated search results:', error);
      }
    );
  }

  editSearchRequest() {
    this.showEditComponent = true;
  }

  cancelEdit() {
    this.showEditComponent = false;
  }

  applyFilter() {
    const selectedTypes = Object.keys(this.typeSelections)
      .filter((type) => this.typeSelections[type])
      .map((type) => type.toLowerCase());

    const selectedModels = Object.keys(this.modelSelections)
      .filter((model) => this.modelSelections[model])
      .map((model) => model.toLowerCase());

    const selectedMakes = Object.keys(this.makeSelections)
      .filter((make) => this.makeSelections[make])
      .map((make) => make.toLowerCase());

    const selectedPriceRanges = this.priceModels.filter(
      (price) => price.checked
    );

    this.applyFilters.emit({
      selectedTypes: selectedTypes,
      selectedModels: selectedModels,
      selectedMakes: selectedMakes,
      selectedPrices: selectedPriceRanges,
    });
  }

  resetFilters() {
    this.typeSelections = {};
    this.modelSelections = {};
    this.makeSelections = {};
    this.applyFilter();
  }

  rentCar(car: Car): void {
    alert(
      `You have rented ${car.modelName} ${car.makeName}. Have a safe journey!`
    );
  }
}
