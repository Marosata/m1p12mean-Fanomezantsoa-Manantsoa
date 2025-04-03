import { Component } from "@angular/core";
import { VehiculeService } from "../../../service/vehicule.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-vehicule-create",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <mat-card class="form-card">
        <mat-card-header>
          <mat-card-title>Ajouter un nouveau véhicule</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="vehiculeForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Nom du véhicule</mat-label>
              <input matInput formControlName="nom" required />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Type</mat-label>
              <input matInput formControlName="type" required />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Immatriculation</mat-label>
              <input matInput formControlName="immatriculation" required />
            </mat-form-field>

            <input type="file" (change)="onFileSelected($event)" required />

            <button mat-raised-button color="primary" type="submit">
              Enregistrer
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
      }
      .form-card {
        padding: 2rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      button {
        align-self: flex-end;
      }
    `,
  ],
})
export class VehiculeCreateComponent {
    vehiculeForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private vehiculeService: VehiculeService
  ) {
    // Déplacer l'initialisation du formulaire dans le constructeur
    this.vehiculeForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      immatriculation: ['', Validators.required],
      utilisateurId: ['user-id'] // À remplacer par l'ID réel
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.vehiculeForm.valid && this.selectedFile) {
      this.vehiculeService
        .createVehicule(this.selectedFile, this.vehiculeForm.value)
        .subscribe({
          next: () => alert("Véhicule créé avec succès!"),
          error: (err) => alert("Erreur: " + err.message),
        });
    }
  }
}
