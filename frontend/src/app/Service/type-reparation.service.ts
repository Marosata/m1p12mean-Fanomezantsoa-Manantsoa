import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TypeReparation } from '../Model/TypeReparation';

@Injectable({
  providedIn: 'root'
})
export class TypeReparationService {
  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  Url1= `${this.baseUrl}/typeReparation/findTypeReparation`;

  getAllTypeReparation()
  {
    return this.http.get<TypeReparation[]>(this.Url1);
  }
}
