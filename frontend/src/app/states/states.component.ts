import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { VehiculeService } from '../Service/vehicule.service';
import { TempsMoyen } from '../Model/TempsMoyen';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  public tempsMoyen: TempsMoyen[] | undefined;

  constructor(private http: HttpClient, private vehiculeService: VehiculeService, private renderer: Renderer2, private el: ElementRef) {
    this.chartOptions = {
      series: [
        {
          name: "Avg Time",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        type: "category",
        categories: [],
      },
      yaxis: {
        title: {
          text: "Avg Time (seconds)"
        }
      }
    };
  }

  ngOnInit(){
    this.getListeTempsMoyen();
    setTimeout(() => { // Hialana amle erreur anle tsy mipoitra am voloany le chart
      this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.el.nativeElement, 'overflow', 'auto');
      window.dispatchEvent(new Event('resize'));
      }, 0);
  }
  
  getListeTempsMoyen() {
    this.vehiculeService.getListeTempsMoyen().subscribe(data => {
      this.tempsMoyen = data;
      const vehicleNames = this.tempsMoyen.map(tm => tm.vehicleName);
      this.chartOptions.xaxis.categories = vehicleNames;
      this.chartOptions.series[0].data = this.tempsMoyen.map((tm, index) => ({ x: vehicleNames[index], y: tm.avgTimeInSeconds }));

      setTimeout(() => {
        this.chart?.render();
      }, 0);
    });
  }
  
  
}