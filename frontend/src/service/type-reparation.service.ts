import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../app/environnement/environnement";
import { TypeReparation } from "../app/models/type-reparation";

@Injectable({
  providedIn: "root",
})
export class TypeReparationService {
  private api = environment.apiUrl + "api/typeReparation";

  typeReparations = signal<TypeReparation[]>([]);

  constructor(private httpClient: HttpClient) {}

  getAllTypeReparation(): Observable<TypeReparation[]> {
    return this.httpClient.get<TypeReparation[]>(`${this.api}/findTypeReparation`);
  }

  getTypeReparationById(id: string): Observable<TypeReparation> {
    return this.httpClient.get<TypeReparation>(`${this.api}/findTypeReparationById/${id}`);
  }

  createTypeReparation(typeReparation: TypeReparation): Observable<TypeReparation> {
    return this.httpClient.post<TypeReparation>(`${this.api}/createTypeReparation`, typeReparation);
  }
}
