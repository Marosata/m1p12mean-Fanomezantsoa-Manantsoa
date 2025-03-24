import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://projetmean-fanomezantsoa-manantsoa.onrender.com';

  constructor(private http: HttpClient) {}

  getApiStatus(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get<any>(this.apiUrl);
  }
}
