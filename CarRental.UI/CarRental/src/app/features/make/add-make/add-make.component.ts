import { Component, OnDestroy } from '@angular/core';
import { AddMakeRequest } from '../models/add-model.model';
import { MakeService } from '../service/make.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.css'],
})
export class AddMakeComponent implements OnDestroy {
  model: AddMakeRequest;
  private addMakeSubscription?: Subscription;

  constructor(private makeService: MakeService, private router: Router) {
    this.model = {
      name: '',
    };
  }

  onFormSubmit() {
    this.addMakeSubscription = this.makeService.addMake(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/makes');
      },
    });
  }

  ngOnDestroy(): void {
    this.addMakeSubscription?.unsubscribe();
  }
}
