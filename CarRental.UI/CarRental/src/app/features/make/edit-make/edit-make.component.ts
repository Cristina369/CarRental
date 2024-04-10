import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Make } from '../models/make.model';
import { MakeService } from '../service/make.service';

@Component({
  selector: 'app-edit-make',
  templateUrl: './edit-make.component.html',
  styleUrls: ['./edit-make.component.css'],
})
export class EditMakeComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  make?: Make;

  constructor(
    private route: ActivatedRoute,
    private makeService: MakeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.makeService.getMakeById(this.id).subscribe({
            next: (response) => {
              this.make = response;
            },
          });
        }
      },
    });
  }

  onDelete(): void {
    if (this.id) {
      this.makeService.deleteMake(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/makes');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
