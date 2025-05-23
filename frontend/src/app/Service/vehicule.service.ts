import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TempsMoyen } from '../Model/TempsMoyen';
import { Vehicule } from '../Model/vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
   private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  Url1= `${this.baseUrl}/api/vehicule/findVehiculeReparationPayer`;
  Url2=  `${this.baseUrl}/api/vehicule/findVoitureTerminee`;
  Url3=  `${this.baseUrl}/api/vehicule/updateStatusVehicule`;
  Url4=  `${this.baseUrl}/api/vehicule/findVoitureBondeSortieValider`;
  url5=  `${this.baseUrl}/api/vehicule/findVehiculeRecuperer`;
  url6= `${this.baseUrl}/api/vehicule/updateStatusVehiculeRecuperer`;
  url7= `${this.baseUrl}/api/vehicule/findHistoriqueVehicule`;
  url8= `${this.baseUrl}/api/vehicule/stats`;

  getVehiculeReparationPayer()
  {
    return this.http.get<Vehicule[]>(this.Url1);
  }
  getVehiculeTerminee()
  {
    return this.http.get<Vehicule[]>(this.Url2);
  }
  updateStatusVehicule(_id:any){
    const val =this.http.post<Vehicule>(`${this.Url3}/${_id}`,null);
    return val;
  }
  getVoitureBondeSortieValider(){
    return this.http.get<Vehicule[]>(this.Url4);
  }
  getListesVehiculeRecuperer(utilisateurId: any){
    const repons =this.http.get<Vehicule[]>(`${this.url5}/${utilisateurId}`);
    return repons;
  }
  updateStatusVehiculeRecuperer(_id:any){
    const val =this.http.post<Vehicule>(`${this.url6}/${_id}`,null);
    return val;
  }
  getHistoriqueVehicules(utilisateurId: any){
    const repons =this.http.get<Vehicule[]>(`${this.url7}/${utilisateurId}`);
    return repons;
  }
  getListeTempsMoyen(){
    return this.http.get<TempsMoyen[]>(this.url8);
  }
}
