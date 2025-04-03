import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../app/environnement/environnement";
import { Vehicule } from "../app/models/vehicule";

@Injectable({
  providedIn: "root",
})
export class VehiculeService {
  private api = environment.apiUrl + "api/vehicule";
  vehicules = signal<Vehicule[]>([]);

  constructor(private httpClient: HttpClient) {}

  createVehicule(file: File, vehiculeData: any): Observable<Vehicule> {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(vehiculeData).forEach(key => {
      formData.append(key, vehiculeData[key]);
    });
    return this.httpClient.post<Vehicule>(`${this.api}/createVehicule`, formData);
  }

  getClientVehicules(utilisateurId: string): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(`${this.api}/findVoitureClient/${utilisateurId}`);
  }

  getValideVehicules(utilisateurId: string): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(`${this.api}/findVoitureValide/${utilisateurId}`);
  }

  getVehiculesReparationPayer(): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(`${this.api}/findVehiculeReparationPayer`);
  }

  updateStatusVehicule(id: string, status: string): Observable<any> {
    return this.httpClient.post(`${this.api}/updateStatusVehicule/${id}`, { status });
  }

  getStats(): Observable<any> {
    return this.httpClient.get(`${this.api}/stats`);
  }
}