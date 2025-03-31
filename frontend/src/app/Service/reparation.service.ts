import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Reparation } from '../Model/Reparation';
import { Vehicule } from '../Model/vehicule';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  Url1= `${this.baseUrl}/reparation/createReparation`;
  Url2= `${this.baseUrl}/reparation/findDepotReparationParVoiture`;
  url3= `${this.baseUrl}/reparation/listeVehiculeDepot`;
  url4= `${this.baseUrl}/reparation/getReparationParVehicule`;
  url5= `${this.baseUrl}/reparation/updateOneReparationEncours`;
  url6= `${this.baseUrl}/reparation/getReparationAFaire`;
  url7= `${this.baseUrl}/reparation/getReparationEnCours`;
  url8= `${this.baseUrl}/reparation/getReparationTerminee`;
  url9= `${this.baseUrl}/reparation/updateOneReparationTerminee`;
  url10= `${this.baseUrl}/reparation/getReparationavancement`;
  url11= `${this.baseUrl}/reparation/updateVehiculeTerminee`;
  url12= `${this.baseUrl}/reparation/getFactureReparationParVoiture`;
  url13= `${this.baseUrl}/reparation/getBondeSortieParVoiture`;
  url14= `${this.baseUrl}/reparation/getHistoriqueReparation`;

  creationReparation(reparation: Reparation)
  {
    console.log(reparation._id)
    //console.log(reparation.avancement);
    console.log(reparation.statusUneReparation);
    // console.log(reparation.typeReparationId);
    // console.log(reparation.vehiculeId)
    return this.http.post<Reparation>(this.Url1,reparation);
  }
  getListeVoituresDeposer(utilisateurId: any){
    const repons =this.http.get<Reparation[]>(`${this.Url2}/${utilisateurId}`);
    return repons;
  } 
  getListeVehiculeDeposer(utilisateurId: any){
    const repons =this.http.get<Vehicule[]>(`${this.url3}/${utilisateurId}`);
    return repons;
  } 
  getListesReparationsByVehicule(vehicule: any){
    const val =this.http.get<Reparation[]>(`${this.url4}/${vehicule}`);
    return val;
  }
  updateOneReparationEncours(_id:any){
    const val =this.http.post<Reparation>(`${this.url5}/${_id}`,null);
    return val;
  }
  updateOneReparationTerminee(_id:any){
    const val =this.http.post<Reparation>(`${this.url9}/${_id}`,null);
    return val;
  }
  getReparationAFaire(vehicule: any){
    const val =this.http.get<Reparation[]>(`${this.url6}/${vehicule}`);
    return val;
  }
  getReparationEnCours(vehicule: any){
    const val =this.http.get<Reparation[]>(`${this.url7}/${vehicule}`);
    return val;
  }
  getReparationTerminee(vehicule: any){
    const val =this.http.get<Reparation[]>(`${this.url8}/${vehicule}`);
    return val;
  }
  getAllReparationAvancement(utilisateur: any,vehicule: any){
    const rep = this.http.get<Reparation[]>(`${this.url10}/${utilisateur}/${vehicule}`);
    return rep;
  }
  updateVehiculeTerminee(vehicule:any){
    const val =this.http.post<Vehicule>(`${this.url11}/${vehicule}`,null);
    return val;
  }
getFactureClient(utilisateur: any,vehicule: any){
    const po = this.http.get<Reparation[]>(`${this.url12}/${utilisateur}/${vehicule}`);
    return po;
  }
  getBondeSortieParVoiture(utilisateur: any,vehicule: any){
    const po = this.http.get<Reparation[]>(`${this.url13}/${utilisateur}/${vehicule}`);
    return po;
  }
  getHistoriquesReparations(utilisateur: any,vehicule: any){
    const po = this.http.get<Reparation[]>(`${this.url14}/${utilisateur}/${vehicule}`);
    return po;
  }
}

