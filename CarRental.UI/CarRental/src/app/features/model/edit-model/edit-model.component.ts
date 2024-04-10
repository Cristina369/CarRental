import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model } from '../models/model.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from '../services/model.service';
import { MakeService } from '../../make/service/make.service';
import { UpdateModel } from '../models/update-model.model';
import { Make } from '../../make/models/make.model';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css'],
})
export class EditModelComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: Model;
  makes$?: Observable<Make[]>;
  selectedMake?: string;

  routeSubscription?: Subscription;
  updateModelSubscription?: Subscription;
  getModelSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private makeService: MakeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.makes$ = this.makeService.getAllMakes();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.getModelSubscription = this.modelService
            .getModelById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedMake = response.makeId.toString();
              },
            });
        }
      },
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id && this.selectedMake) {
      var updateModel: UpdateModel = {
        name: this.model.name,
        description: this.model.description,
        makeId: this.selectedMake,
      };

      this.updateModelSubscription = this.modelService
        .updateModel(this.id, updateModel)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/models');
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateModelSubscription?.unsubscribe();
    this.getModelSubscription?.unsubscribe();
  }
}
