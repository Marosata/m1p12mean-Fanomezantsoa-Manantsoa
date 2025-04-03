import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
=======
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, CommonModule, FooterComponent, RouterModule],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <span class="brand">AutoCare</span>
      <nav class="nav-links">
        <a mat-button routerLink="/">Accueil</a>
        <a mat-button routerLink="/inscription">Inscription ou Connexion</a>
      </nav>
    </mat-toolbar>

    <div class="hero">
      <div class="hero-content">
        <h1>Bienvenue chez AutoCare</h1>
        <p class="hero-text">
          Votre solution complète pour l'entretien automobile en ligne.<br>
          Prenez rendez-vous, comparez nos tarifs transparents et gérez vos réparations en toute simplicité.
        </p>
        <p class="extra-text">
          Découvrez nos services innovants et notre équipe d'experts dédiés à votre satisfaction.<br>
          Laissez-vous guider par notre expertise et faites de votre véhicule une priorité.
        </p>
      </div>
      <!-- Éléments animés -->
      <div class="floating-element element1"></div>
      <div class="floating-element element2"></div>
      <div class="floating-element element3"></div>
    </div>

    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    /* Style pour la toolbar */
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
      margin-left: auto;
    }
    .nav-links a {
      margin-left: 2rem;
      font-size: 1.1rem;
    }

    /* Style pour la section hero */
    .hero {
      position: relative;
      background: #2c3e50;
      color: white;
      padding: 4rem 0;
      text-align: center;
      overflow: hidden;
    }
    .hero-content {
      position: relative;
      z-index: 2;
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
      opacity: 0.9;
    }
    .extra-text {
      margin-top: 1.5rem;
      font-size: 1.1rem;
      font-style: italic;
    }

    /* Style pour le main */
    main {
      min-height: 500px;
      padding: 2rem 8%;
    }

    /* Styles pour les éléments animés */
    .floating-element {
      position: absolute;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      z-index: 1;
      animation: float 8s ease-in-out infinite;
    }
    .element1 {
      width: 50px;
      height: 50px;
      top: 10%;
      left: 15%;
      animation-duration: 10s;
    }
    .element2 {
      width: 80px;
      height: 80px;
      top: 60%;
      left: 70%;
      animation-duration: 12s;
    }
    .element3 {
      width: 40px;
      height: 40px;
      top: 40%;
      left: 30%;
      animation-duration: 8s;
    }

    /* Animation pour créer un mouvement aléatoire */
    @keyframes float {
      0% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(20px, -20px);
      }
      50% {
        transform: translate(-20px, 20px);
      }
      75% {
        transform: translate(15px, 15px);
      }
      100% {
        transform: translate(0, 0);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .toolbar {
        padding: 0 2rem;
      }
      .brand {
        font-size: 1.4rem;
      }
      .nav-links a {
        margin-left: 1rem;
        font-size: 1rem;
      }
      h1 {
        font-size: 2rem;
      }
      .hero-text, .extra-text {
        font-size: 1rem;
      }
    }
  `]})
>>>>>>> develop
export class AppComponent {
  title = 'frontend';
}