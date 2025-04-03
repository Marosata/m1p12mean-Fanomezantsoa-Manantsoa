import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./pages/footer/footer.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    FooterComponent,
    RouterModule,
    MatMenuModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <span class="brand">AutoCare</span>
      <nav class="nav-links">
        <a mat-button routerLink="/">Accueil</a>

        <a mat-button 
           *ngIf="isLoggedIn() && (isResponsableAtelier() || isResponsableFinancier())"
           routerLink="/vehicules">
          Véhicules
        </a>

        <a mat-button 
           *ngIf="isLoggedIn() && isResponsableFinancier()"
           routerLink="/stats">
          Statistiques
        </a>

        <a mat-button 
           *ngIf="isLoggedIn() && isClient()"
           routerLink="/vehicule/create">
          Déclarer un véhicule
        </a>

        <!-- Menu utilisateur -->
        <div *ngIf="isLoggedIn(); else loginButton" class="user-menu">
          <button mat-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
            {{ getUserName() }}
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              Déconnexion
            </button>
          </mat-menu>
        </div>

        <ng-template #loginButton>
          <a mat-button routerLink="/inscription">Connexion</a>
        </ng-template>
      </nav>
    </mat-toolbar>

    <div class="hero">
      <div class="hero-content">
        <h1>Bienvenue chez AutoCare</h1>
        <p class="hero-text">
          Votre solution complète pour l'entretien automobile en ligne.<br>
          Prenez rendez-vous, comparez nos tarifs transparents et gérez vos réparations en toute simplicité.
        </p>
      </div>
    </div>

    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
      padding: 0 8%;
    }
    .brand {
      font-size: 1.8rem;
      font-weight: 500;
      letter-spacing: 1px;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .user-menu {
      margin-left: 2rem;
      display: flex;
      align-items: center;
    }
    .user-menu button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hero {
      background: #2c3e50;
      color: white;
      padding: 4rem 0;
      text-align: center;
    }
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
    .hero-text {
      font-size: 1.2rem;
      line-height: 1.6;
    }
    main {
      min-height: 500px;
      padding: 2rem 8%;
    }

    @media (max-width: 768px) {
      .toolbar {
        padding: 0 1rem;
      }
      .brand {
        font-size: 1.4rem;
      }
      .nav-links {
        gap: 0.5rem;
      }
      h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  isClient(): boolean {
    return this.authService.hasRole('client');
  }

  isResponsableAtelier(): boolean {
    return this.authService.hasRole('responsable_atelier');
  }

  isResponsableFinancier(): boolean {
    return this.authService.hasRole('responsable_financier');
  }

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  getUserName(): string {
    return this.authService.getCurrentUser()?.nom || 'Compte';
  }

  logout(): void {
    this.authService.signout();
  }
}