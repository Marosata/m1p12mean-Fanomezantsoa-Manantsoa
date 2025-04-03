import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../app/environnement/environnement";
import { Reparation } from "../app/models/reparation";

@Injectable({
  providedIn: "root",
})
export class ReparationService {
  private api = environment.apiUrl + "api";

  reparations = signal<Reparation[]>([]);

  constructor(private httpClient: HttpClient) {}

  getAllReparations(): Observable<Reparation[]> {
    return this.httpClient.get<Reparation[]>(`${this.api}/reparation/findReparation`);
  }

  getReparationById(id: string): Observable<Reparation> {
    return this.httpClient.get<Reparation>(`${this.api}/findReparationById/${id}`);
  }

  createReparation(reparation: Reparation): Observable<Reparation> {
    return this.httpClient.post<Reparation>(`${this.api}/createReparation`, reparation);
  }
}
