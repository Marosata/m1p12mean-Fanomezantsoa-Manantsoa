import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ apiStatus }}</h1>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  apiStatus: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getApiStatus().subscribe(response => {
      this.apiStatus = response.message; // Accéder à "message" du JSON
    });
  }
}
