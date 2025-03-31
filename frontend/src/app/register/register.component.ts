// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe(
      (res: any) => {
        // Optionnel : afficher un message ou rediriger vers la page login
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errorMessage = 'Erreur lors de l\'inscription.';
      }
    );
  }
}
