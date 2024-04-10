import { Component, OnDestroy, OnInit } from '@angular/core';
import { Make } from '../models/make.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MakeService } from '../service/make.service';

@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.css'],
})
export class MakeListComponent implements OnInit, OnDestroy {
  id: string | null = null;
  makes$?: Observable<Make[]>;

  deleteMakeSubscription?: Subscription;

  constructor(private makeService: MakeService, private router: Router) {}

  ngOnInit(): void {
    this.makeService.getAllMakes().subscribe({
      next: (response) => {
        this.makes$ = this.makeService.getAllMakes();
      },
    });
  }

  onDelete(id: string): void {
    if (id) {
      this.deleteMakeSubscription = this.makeService.deleteMake(id).subscribe({
        next: (response) => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/makes']);
            });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.deleteMakeSubscription?.unsubscribe();
  }
}
