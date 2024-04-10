import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Location } from '../models/location-result.model';
import { SearchService } from '../services/search.service';
import { LoadChildren, Router } from '@angular/router';
import { SearchRequest } from '../models/search.model';
import { Car } from '../../car/models/car.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() justTickers: boolean = false;
  @Output() locationSelected = new EventEmitter<{
    location: Location;
    type: 'pickup' | 'return';
  }>();

  selectedValue: string | null = null;
  pickupSelectedValue: string | null = null;
  returnSelectedValue: string | null = null;

  pickupSearchResults!: Observable<Location[]>;
  returnSearchResults!: Observable<Location[]>;

  private pickupSearchTerms = new Subject<string>();
  private returnSearchTerms = new Subject<string>();

  searchResults!: Observable<Location[]>;
  private searchTerms = new Subject<string>();
  searchResultsSubscribedArray: Location[] = [];
  searchResultsSubscribedArray1: Location[] = [];

  highlightedIndex = -1;

  model: SearchRequest = {
    pickupDate: new Date(),
    returnDate: new Date(),
    pickupLocation: {
      id: 'defaultId',
      name: 'defaultName',
      city: 'defaultCity',
      street: 'defaultStreet',
      phone: 'defaultPhone',
    },
    returnLocation: {
      id: 'defaultId',
      name: 'defaultName',
      city: 'defaultCity',
      street: 'defaultStreet',
      phone: 'defaultPhone',
    },
  };

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.pickupSearchResults = this.pickupSearchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.searchService.search(term))
    );

    this.returnSearchResults = this.returnSearchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.searchService.search(term))
    );

    this.searchResults.subscribe(
      (results) => {
        this.searchResultsSubscribedArray = results;
        this.searchResultsSubscribedArray1 = results;
      },
      (error) => {
        console.log('Error fetching search results:', error);
      }
    );

    this.loadSavedParameters();
  }

  loseFocus() {
    this.pickupSearchTerms.next('');
    this.returnSearchTerms.next('');
  }

  pickupClicked(location: Location) {
    this.pickupSelectedValue = location.city;
    this.model.pickupLocation = location;
    this.locationSelected.emit({ location, type: 'pickup' });
  }

  returnClicked(location: Location) {
    this.returnSelectedValue = location.city;
    this.model.returnLocation = location;
    this.locationSelected.emit({ location, type: 'return' });
  }

  onPickupModelChange($event: string) {
    this.pickupSearchTerms.next($event);
  }

  onReturnModelChange($event: string) {
    this.returnSearchTerms.next($event);
  }

  onSubmit(): void {
    this.searchService.searchAvailability(this.model).subscribe(
      (results: Car[]) => {
        this.router.navigate(['/search-results'], {
          state: { searchResults: results, searchRequest: this.model },
        });
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );

    this.saveParameters();
  }

  parseDatePickUp(dateString: Date): Date {
    this.model.pickupDate = dateString;
    return new Date(dateString);
  }

  parseDateReturn(dateString: Date): Date {
    this.model.returnDate = dateString;
    return new Date(dateString);
  }

  onKeyDown($event: KeyboardEvent) {}

  private loadSavedParameters() {
    const savedSearchRequestString = localStorage.getItem('searchRequest');
    const savedSearchResultsString = localStorage.getItem('searchResults');

    if (savedSearchRequestString && savedSearchResultsString) {
      const savedSearchRequest = JSON.parse(savedSearchRequestString);
      const savedSearchResults = JSON.parse(savedSearchResultsString);

      if (savedSearchRequest) {
        this.model = savedSearchRequest;
      }
      if (savedSearchResults) {
        this.searchResults = savedSearchResults;
      }
    } else {
      console.log('No saved parameters found.');
    }
  }

  private saveParameters() {
    localStorage.setItem('searchRequest', JSON.stringify(this.model));
    localStorage.setItem('searchResults', JSON.stringify(this.searchResults));
  }
}
