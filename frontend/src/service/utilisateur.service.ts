import { Injectable,signal } from "@angular/core";
import { environment } from "../app/environnement/environnement";
import { Utilisateur } from "../app/models/utilisateur";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class UtilisateurService {
    private api = environment.apiUrl +"/api/auth";
    utilisateurs = signal<Utilisateur[]>([]);
    utilisateur = signal<Utilisateur>({} as Utilisateur);

    constructor(private httpClient:HttpClient){}

    signup(utilisateur : Utilisateur):Observable<any>{
        return this.httpClient.post(`${this.api}/signup`,utilisateur)
    }
    
    signin(credentials: { email: string; password: string }): Observable<any> {
        return this.httpClient.post(`${this.api}/signin`, credentials);
    }

    signout(): Observable<any> {
        return this.httpClient.post(`${this.api}/signout`, {});
    }

  }