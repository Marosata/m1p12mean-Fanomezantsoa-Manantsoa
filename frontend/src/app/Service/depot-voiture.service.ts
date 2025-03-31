import { Injectable } from '@angular/core';
import { Vehicule } from '../Model/vehicule';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Reparation } from '../Model/Reparation';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export const previewFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader  = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result as string);
    }
    reader.onerror = function () {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}
export const dataURItoBlob = (dataURI: string) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], {type: mimeString});
  return blob;

}

@Injectable({
  providedIn: 'root'
})
export class DepotVoitureService {
  private baseUrl = environment.apiUrl;
  private url = `${this.baseUrl}/vehicule/createVehicule`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http:HttpClient) { }
  UrlDepot=`${this.baseUrl}/vehicule/createVehicule`;
  Url2 = `${this.baseUrl}/vehicule/findVoitureClient`;
  url3 = `${this.baseUrl}/vehicule/findVoitureValide`;
  Url4 = `${this.baseUrl}/reparation/deleteReparation`;
  Url5 = `${this.baseUrl}/reparation/findReparationById`;
  Url6 = `${this.baseUrl}/reparation/listeDepotVoitureParVoiture`;

 async depotVoiture (nom: string,type: string, file: File, immatriculation: string, utilisateurId: any){
    const formData = new FormData();
      formData.append('nom',nom);
      formData.append('type',type);
      formData.append('file', dataURItoBlob(await previewFile(file)));
      formData.append('immatriculation',immatriculation);
      formData.append('utilisateurId',utilisateurId);
      console.log(file);
      console.log(nom);
      console.log(immatriculation);
      console.log(utilisateurId)

      const req = new HttpRequest('POST', `${this.UrlDepot}`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

      return this.http.request(req);
  }
  getOneVoitureClient(utilisateurId: any){
    const res = this.http.get<Vehicule[]>(`${this.Url2}/${utilisateurId}`);
    console.log(res)
    return res;
  }
  getListeVoituresValide(utilisateurId: any){
    const repons =this.http.get<Vehicule[]>(`${this.url3}/${utilisateurId}`);
    return repons;
  } 
  deleteReparation(_id:any){
    return this.http.delete<void>(`${this.Url4}/${_id}`);
  }
  getListeReparationByReparation(_id:any){
    const repons =this.http.get<Reparation[]>(`${this.Url5}/${_id}`);
    return repons;
  }
  getListeReparationParVehicule(utilisateur:any , vehicule: any){
    const repons =this.http.get<Reparation[]>(`${this.Url6}/${utilisateur}/${vehicule}`);
    return repons;
  }
}
