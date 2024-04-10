import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: User;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.model = {
      firstName: '',
      lastName: '',
      phoneNumber: 0,
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.registerService.register(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
      },
    });
  }
}
