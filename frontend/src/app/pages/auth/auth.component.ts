import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Utilisateur } from "../../models/utilisateur";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-tabs">
        <button
          (click)="selectTab('signin')"
          [class.active]="selectedTab === 'signin'"
        >
          Se connecter
        </button>
        <button
          (click)="selectTab('signup')"
          [class.active]="selectedTab === 'signup'"
        >
          S'inscrire
        </button>
      </div>

      <!-- Formulaire de connexion -->
      <div *ngIf="selectedTab === 'signin'" class="auth-form">
        <h2>Connexion</h2>
        <form (ngSubmit)="onSignin()">
          <div class="form-group">
            <label>Nom :</label>
            <input
              type="text"
              [(ngModel)]="signinData.nom"
              name="nom"
              required
            />
          </div>
          <div class="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              [(ngModel)]="signinData.mot_de_passe"
              name="mot_de_passe"
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>

      <!-- Formulaire d'inscription -->
      <div *ngIf="selectedTab === 'signup'" class="auth-form">
        <h2>Inscription</h2>
        <form (ngSubmit)="onSignup()">
          <div class="form-group">
            <label>Nom :</label>
            <input
              type="text"
              [(ngModel)]="signupData.nom"
              name="nom"
              required
            />
          </div>
          <div class="form-group">
            <label>Email :</label>
            <input
              type="email"
              [(ngModel)]="signupData.email"
              name="email"
              required
            />
          </div>
          <div class="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              [(ngModel)]="signupData.mot_de_passe"
              name="mot_de_passe"
              required
            />
          </div>
          <div class="form-group">
            <label>Type de profil :</label>
            <select [(ngModel)]="selectedRole" name="roles" required>
              <option
                *ngFor="let role of rolesDisponibles"
                [value]="role.valeur"
              >
                {{ role.affichage }}
              </option>
            </select>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        width: 320px;
        margin: 2rem auto;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
      }
      .auth-tabs {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
      }
      .auth-tabs button {
        padding: 0.5rem 1rem;
        border: none;
        background: #eee;
        cursor: pointer;
        transition: background 0.3s;
      }
      .auth-tabs button.active {
        background: #4285f4;
        color: white;
      }
      .auth-form {
        text-align: left;
      }
      .auth-form h2 {
        text-align: center;
        margin-bottom: 1rem;
      }
      .form-group {
        margin-bottom: 1rem;
      }
      .form-group label {
        display: block;
        margin-bottom: 0.3rem;
      }
      .form-group input {
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
        border-radius: 4px;
      }
      button[type="submit"] {
        width: 100%;
        padding: 0.5rem;
        background: #4285f4;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.3s;
      }
      button[type="submit"]:hover {
        background: #357ae8;
      }

      .form-group select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        margin-top: 0.3rem;
      }
      .form-group select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        margin-top: 0.3rem;
      }
    `,
  ],
})
export class AuthComponent {
  selectedTab: "signin" | "signup" = "signin";

  rolesDisponibles = [
    { affichage: "Client", valeur: "client" },
    { affichage: "Responsable Financier", valeur: "responsable_financier" },
    { affichage: "Responsable Atelier", valeur: "responsable_atelier" },
  ];

  signinData = {
    nom: "",
    mot_de_passe: "",
  };

  signupData: Utilisateur = {
    nom: "",
    email: "",
    mot_de_passe: "",
    roles: ["client"],
  };
  selectedRole: string = "client";
  constructor(private authService: AuthService, private router: Router) {}

  selectTab(tab: "signin" | "signup") {
    this.selectedTab = tab;
  }

  onSignin() {
    this.authService.signin(this.signinData).subscribe({
      next: (response) => {
        console.log(response.token); // tsy mety 
        alert("Connexion réussie : nom "+ response.user.nom+" email "+response.user.email);
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("Erreur !!!")
        console.error("Erreur lors de la connexion :", error);
      },
    });
  }

  onSignup() {
    this.signupData.roles = [this.selectedRole];

    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        alert("Inscription réussie ")
        console.log("Inscription réussie :", response);
        this.selectedTab = "signin";
      },
      error: (error) => {
        alert("Erreur !!!")
        console.error("Erreur lors de l'inscription :", error);
      },
    });
  }
}
