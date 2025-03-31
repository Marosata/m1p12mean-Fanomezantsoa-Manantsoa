// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (res: any) => {
        // Enregistrer le token ou les infos de session
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.errorMessage = 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.';
      }
    );
  }
}
