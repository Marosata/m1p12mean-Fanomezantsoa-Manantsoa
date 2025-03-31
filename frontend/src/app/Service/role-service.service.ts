import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../Model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  Url1=  `${this.baseUrl}/role/findRole`;

  getAllRole()
  {
    return this.http.get<Role[]>(this.Url1);
  }
}
