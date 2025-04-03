import { Component, OnInit } from "@angular/core";
import { TypeReparation } from "../../models/type-reparation";
import { TypeReparationService } from "../../../service/type-reparation.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
  ],
  template: `
    <div class="container">
      <h2 class="title">Nos Services de Réparation</h2>

      <div class="grid-container">
        <mat-card
          *ngFor="let type of pagedTypeReparations"
          class="service-card"
        >
          <mat-card-header>
            <mat-card-title class="service-title">{{
              type.nomTypeReparation
            }}</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <p class="service-description">{{ type.description }}</p>
            <div class="price-container">
              <span class="price">{{ type.prixReparation | number }} Ar</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-paginator
        [length]="typeReparations.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="[6, 12, 24]"
        (page)="onPageChange($event)"
        class="paginator"
      >
      </mat-paginator>
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
        font-size: 2rem;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
      }

      .service-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border-radius: 10px;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .service-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      }

      .service-title {
        font-size: 1.3rem !important;
        color: #2c3e50 !important;
        font-weight: 600;
      }

      .service-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .price-container {
        text-align: right;
        margin-top: auto;
      }

      .price {
        background: #2c3e50;
        color: white;
        padding: 8px 20px;
        border-radius: 20px;
        font-weight: 500;
        display: inline-block;
      }

      .paginator {
        margin-top: 2rem;
        background: #f8f9fa;
        border-radius: 10px;
      }

      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: 1fr;
        }

        .title {
          font-size: 1.5rem;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  typeReparations: TypeReparation[] = [];
  pagedTypeReparations: TypeReparation[] = [];
  pageSize = 5;
  pageIndex = 0;

  constructor(private typeReparationService: TypeReparationService) {}

  ngOnInit(): void {
    this.fetchTypeReparations();
  }

  fetchTypeReparations(): void {
    this.typeReparationService.getAllTypeReparation().subscribe((data) => {
      this.typeReparations = data;
      this.updatePagedData();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedData();
  }

  private updatePagedData(): void {
    const start = this.pageIndex * this.pageSize;
    this.pagedTypeReparations = this.typeReparations.slice(
      start,
      start + this.pageSize
    );
  }
}
