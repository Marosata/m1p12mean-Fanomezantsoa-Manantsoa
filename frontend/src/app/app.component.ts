import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ apiStatus }}</h1>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  apiStatus: string = '';
  apiService: any;

  constructor(private a: AuthService) {}

  ngOnInit() {
    this.apiService.getApiStatus().subscribe((response: { message: string; }) => {
      this.apiStatus = response.message; // Accéder à "message" du JSON
    });
  }
}
