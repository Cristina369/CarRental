import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchRequest } from '../models/search.model';
import { SearchService } from '../services/search.service';
import { Car } from '../../car/models/car.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  searchRequest!: SearchRequest;
  searchResults!: Car[];
  showEditComponent: boolean = false;
  filterModalOpen: boolean = false;
  cars!: Car[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchRequest = history.state?.searchRequest || null;
      this.searchResults = history.state?.searchResults || null;

      this.loadSavedParameters();
    });
  }

  onEdit(editedSearchRequest: SearchRequest): void {
    this.searchRequest = editedSearchRequest;

    this.showEditComponent = false;
    this.updateSearchResults();
    this.saveParameters();
  }

  updateSearchResults() {
    this.searchService.searchAvailability(this.searchRequest).subscribe(
      (results: Car[]) => {
        this.searchResults = results;
        this.searchRequest = this.searchRequest;

        this.saveParameters();
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

  rentCar(car: Car): void {
    this.router.navigate(['/rent', car.id], {
      state: { searchRequest: this.searchRequest, car: car },
    });
  }

  toggleFilterModal() {
    this.filterModalOpen = !this.filterModalOpen;
  }

  applyFilters(selectedFilters: any) {
    const { selectedTypes, selectedModels, selectedMakes, selectedPrices } =
      selectedFilters;

    let filteredResults = [...this.searchResults];
    interface PriceRange {
      min: number;
      max: number;
    }

    filteredResults = filteredResults.filter((car) => {
      const typeMatch =
        !selectedTypes ||
        selectedTypes.length === 0 ||
        selectedTypes.includes(car.type.toLowerCase());
      const modelMatch =
        !selectedModels ||
        selectedModels.length === 0 ||
        selectedModels.includes(car.modelName.toLowerCase());
      const makeMatch =
        !selectedMakes ||
        selectedMakes.length === 0 ||
        selectedMakes.includes(car.makeName.toLowerCase());
      const priceMatch =
        selectedPrices.length === 0 ||
        selectedPrices.some(
          (price: PriceRange) =>
            car.price >= price.min && car.price <= price.max
        );
      return typeMatch && modelMatch && makeMatch && priceMatch;
    });

    if (
      Object.keys(selectedTypes).length === 0 &&
      Object.keys(selectedModels).length === 0 &&
      Object.keys(selectedMakes).length === 0 &&
      selectedPrices.length === 0
    ) {
      this.loadSavedParameters();
      filteredResults = [...this.searchResults];
    }

    this.searchResults = filteredResults;
  }

  private loadSavedParameters() {
    const savedSearchRequest = JSON.parse(
      localStorage.getItem('searchRequest') || '{}'
    );
    const savedSearchResults = JSON.parse(
      localStorage.getItem('searchResults') || '[]'
    );
    if (savedSearchRequest) {
      this.searchRequest = savedSearchRequest;
    }
    if (savedSearchResults) {
      this.searchResults = savedSearchResults;
    }
  }

  private saveParameters() {
    localStorage.setItem('searchRequest', JSON.stringify(this.searchRequest));
    localStorage.setItem('searchResults', JSON.stringify(this.searchResults));
  }
}
