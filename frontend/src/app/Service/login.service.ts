import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  Url=`${this.baseUrl}/auth/signin`;

  loginUtilisateur(nom:string,mot_de_passe:string){
    let params = new HttpParams();
    params = params.set('nom', nom);
    params = params.set('mot_de_passe', mot_de_passe);
    return this.http.post(this.Url, params,{responseType: 'text'});
  }
}
