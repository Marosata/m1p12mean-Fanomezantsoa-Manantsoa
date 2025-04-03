import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../../../service/vehicule.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-vehicule-stats',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective
  ],
  template: `
    <div class="container">
      <h2 class="title">Statistiques des réparations</h2>
      
      <div class="stats-grid">
        <mat-card *ngFor="let stat of stats" class="stat-card">
          <mat-card-header>
            <mat-card-title>{{ stat.vehicleName }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas 
              baseChart
              [type]="doughnutChartType"
              [data]="doughnutChartData(stat)"
              [options]="doughnutChartOptions">
            </canvas>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 2rem auto;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 1rem;
      }
      .stat-card {
        padding: 1.5rem;
      }
    `
  ]
})
export class VehiculeStatsComponent implements OnInit {
  stats: any[] = [];
  public doughnutChartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit() {
    this.vehiculeService.getStats().subscribe(data => {
      this.stats = data;
    });
  }

  doughnutChartData(stat: any): ChartConfiguration<'doughnut'>['data'] {
    return {
      labels: ['Jours', 'Heures'],
      datasets: [
        {
          data: [stat.avgTimeInDays, stat.avgTimeInHours],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };
  }
}