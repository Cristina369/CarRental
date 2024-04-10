import { Component, OnDestroy, OnInit } from '@angular/core';
import { Make } from '../../make/models/make.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModelService } from '../services/model.service';
import { MakeService } from '../../make/service/make.service';
import { AddModel } from '../models/add-model.model';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css'],
})
export class AddModelComponent implements OnInit {
  model: AddModel;
  makes$?: Observable<Make[]>;

  constructor(
    private modelService: ModelService,
    private router: Router,
    private makeService: MakeService
  ) {
    this.model = {
      name: '',
      description: '',
      selectedMake: '',
    };
  }

  ngOnInit(): void {
    this.makes$ = this.makeService.getAllMakes();
  }

  onFormSubmit(): void {
    this.modelService.createModel(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/models');
      },
    });
  }
}
