import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnement/environnement";
import { TypeReparation } from "../models/type-reparation";

@Injectable({
  providedIn: "root",
})
export class TypeReparationService {
  private api = environment.apiUrl + "api";

  typeReparations = signal<TypeReparation[]>([]);

  constructor(private httpClient: HttpClient) {}

  getAllTypeReparation(): Observable<TypeReparation[]> {
    var typerRepairs = this.httpClient.get<TypeReparation[]>(`${this.api}/typeReparation/findTypeReparation`);
    console.log(typerRepairs)
    return typerRepairs;
  }

  getTypeReparationById(id: string): Observable<TypeReparation> {
    return this.httpClient.get<TypeReparation>(`${this.api}/typeReparation/findTypeReparationById/${id}`);
  }

  createTypeReparation(typeReparation: TypeReparation): Observable<TypeReparation> {
    return this.httpClient.post<TypeReparation>(`${this.api}/typeReparation/createTypeReparation`, typeReparation);
  }
}
