import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchRequest } from '../models/search.model';
import { SearchService } from '../services/search.service';
import { Location } from '../models/location-result.model';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, debounceTime, switchMap } from 'rxjs';
import { Car } from '../../car/models/car.model';

@Component({
  selector: 'app-search-edit',
  templateUrl: './search-edit.component.html',
  styleUrls: ['./search-edit.component.css'],
})
export class SearchEditComponent implements OnInit {
  @Input() searchRequest!: SearchRequest;
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onEdit: EventEmitter<SearchRequest> =
    new EventEmitter<SearchRequest>();
  @Output() updateSearchResults: EventEmitter<SearchRequest> =
    new EventEmitter<SearchRequest>();

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

  ngOnInit(): void {
    if (this.searchRequest) {
      this.model = {
        pickupDate: this.searchRequest.pickupDate,
        returnDate: this.searchRequest.returnDate,
        pickupLocation: { ...this.searchRequest.pickupLocation },
        returnLocation: { ...this.searchRequest.returnLocation },
      };
    }

    this.pickupSearchResults = this.pickupSearchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.searchService.search(term))
    );

    this.returnSearchResults = this.returnSearchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.searchService.search(term))
    );

    if (this.searchResults) {
      this.searchResults
        .pipe(
          catchError((error) => {
            console.log('Error in searchResults observable:', error);
            return [];
          })
        )
        .subscribe((results) => {
          this.searchResultsSubscribedArray = results;
          this.searchResultsSubscribedArray1 = results;
        });
    } else {
      console.log('searchResults is undefined. Check initialization.');
    }
  }

  cancelEditing() {
    this.onCancel.emit();
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

  submitEditForm(): void {
    this.onEdit.emit(this.model);

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
}
