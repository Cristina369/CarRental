import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Model } from '../models/model.model';
import { ModelService } from '../services/model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
})
export class ModelListComponent implements OnInit, OnDestroy {
  id: string | null = null;
  models$?: Observable<Model[]>;

  deleteModelSubscription?: Subscription;

  constructor(private modelService: ModelService, private router: Router) {}

  ngOnInit(): void {
    this.models$ = this.modelService.getAllModels();

    this.models$.subscribe((models) => {
      models.forEach((model) => {
        if (model.makeId && model.makeId.name) {
          console.log('Model Name: ' + model.makeId.name);
        } else {
          console.log('Model Make Name is undefined or null');
        }
      });
    });
  }

  onDelete(id: string): void {
    if (id) {
      this.deleteModelSubscription = this.modelService
        .deleteModel(id)
        .subscribe({
          next: (response) => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/admin/models']);
              });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.deleteModelSubscription?.unsubscribe();
  }
}
