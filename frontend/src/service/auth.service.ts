import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Utilisateur } from '../app/models/utilisateur';
import { environment } from '../app/environnement/environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = `${environment.apiUrl}api/auth`;
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  private readonly storageKey = 'autoCareAuthData';
  
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    try {
      const authData = localStorage.getItem(this.storageKey);
      if (authData) {
        const { user, token } = JSON.parse(authData);
        if (user?._id && token) {
          this.currentUserSubject.next(user);
          return;
        }
      }
    } catch (error) {
      console.error('Error parsing auth data:', error);
    }
    this.clearAuthData();
  }

  signup(userData: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.api}/signup`, this.formatUserData(userData)).pipe(
      catchError(this.handleAuthError)
    );
  }

  signin(credentials: { nom: string; mot_de_passe: string }): Observable<{ user: Utilisateur; token: string }> {
    return this.http.post<{ user: Utilisateur; token: string }>(`${this.api}/signin`, credentials).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError(this.handleAuthError)
    );
  }

  signout(): void {
    this.http.post(`${this.api}/signout`, {}).subscribe({
      complete: () => this.clearAuthAndRedirect(),
      error: () => this.clearAuthAndRedirect()
    });
  }

  getCurrentUser(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    return this.currentUserSubject.value?.roles?.includes(role) || false;
  }

  private formatUserData(user: Utilisateur): any {
    return {
      ...user,
      roles: [this.mapRole(user.roles?.[0])]
    };
  }

  private mapRole(role?: string): string {
    const validRoles = ['responsable_financier', 'responsable_atelier', 'client'];
    return validRoles.includes(role || '') ? role! : 'client';
  }

  private handleAuthSuccess(response: { user: Utilisateur; token: string }): void {
    if (!response?.user?._id || !response?.token) {
      throw new Error('Invalid authentication response');
    }

    const authData = {
      user: response.user,
      token: response.token
    };

    localStorage.setItem(this.storageKey, JSON.stringify(authData));
    this.currentUserSubject.next(response.user);
  }

  private clearAuthAndRedirect(): void {
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  private handleAuthError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Identifiants incorrects';
    } else if (error.status === 400) {
      errorMessage = 'Données invalides';
    } else if (error.status >= 500) {
      errorMessage = 'Problème serveur - Veuillez réessayer plus tard';
    }

    console.error('Auth error:', error);
    return throwError(() => new Error(errorMessage));
  }
}