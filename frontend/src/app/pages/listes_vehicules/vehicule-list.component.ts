import { Component, OnInit } from "@angular/core";
import { VehiculeService } from "../../../service/vehicule.service";
import { Vehicule } from "../../models/vehicule";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-vehicule-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <h2 class="title">Liste des véhicules</h2>
      
      <div *ngIf="loading" class="spinner-container">
        <mat-spinner></mat-spinner>
      </div>

      <div class="grid-container" *ngIf="!loading">
        <mat-card *ngFor="let vehicule of pagedVehicules" class="vehicle-card">
          <img [src]="vehicule.image" alt="Image du véhicule" class="vehicle-image">
          <mat-card-content>
            <h3>{{ vehicule.nom }}</h3>
            <p>Type: {{ vehicule.type }}</p>
            <p>Immatriculation: {{ vehicule.immatriculation }}</p>
            <p [ngClass]="{
              'status-pending': vehicule.status === 'non valider',
              'status-valid': vehicule.status === 'valide'
            }">
              Statut: {{ vehicule.status }}
            </p>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-paginator
        [length]="vehicules.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="[6, 12, 24]"
        (page)="onPageChange($event)"
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 1rem;
      }
      .title {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 2rem;
      }
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
      }
      .vehicle-card {
        transition: transform 0.3s ease;
      }
      .vehicle-card:hover {
        transform: translateY(-5px);
      }
      .vehicle-image {
        height: 200px;
        object-fit: cover;
      }
      .status-pending {
        color: #e74c3c;
        font-weight: 500;
      }
      .status-valid {
        color: #2ecc71;
        font-weight: 500;
      }
      .spinner-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
      }
    `
  ]
})
export class VehiculeListComponent implements OnInit {
  vehicules: Vehicule[] = [];
  pagedVehicules: Vehicule[] = [];
  pageSize = 6;
  loading = true;

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit() {
    this.vehiculeService.getClientVehicules('user-id').subscribe({
      next: (data) => {
        this.vehicules = data;
        this.updatePagedData();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePagedData(event.pageIndex);
  }

  private updatePagedData(pageIndex = 0) {
    const start = pageIndex * this.pageSize;
    this.pagedVehicules = this.vehicules.slice(start, start + this.pageSize);
  }
}