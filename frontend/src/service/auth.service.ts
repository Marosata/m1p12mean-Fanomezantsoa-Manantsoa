import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../app/environnement/environnement';
import { Utilisateur } from '../app/models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.apiUrl + 'api/auth';
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const user: Utilisateur = JSON.parse(localStorage.getItem('current_user')!);
      this.currentUserSubject.next(user);
    }
  }

  private getRoleBackend(role: string): string {
    const mapping: { [key: string]: string } = {
      'responsable_financier': 'responsable_financier',
      'responsable_atelier': 'responsable_atelier',
      'client': 'client'
    };
    return mapping[role] || 'client';
  }

  signup(utilisateur: Utilisateur): Observable<any> {
    const role = utilisateur.roles?.[0] || 'client';
    
    const body = {
      ...utilisateur,
      roles: [this.getRoleBackend(role)]
    };
    
    return this.http.post(`${this.api}/signup`, body);
  }
  signin(credentials: { nom: string; mot_de_passe: string }): Observable<any> {
    return this.http.post(`${this.api}/signin`, credentials);
  }

  signout(): Observable<any> {
    return this.http.post(`${this.api}/signout`, {});
  }
}
