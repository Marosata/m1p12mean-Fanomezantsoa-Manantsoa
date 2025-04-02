import { Component,OnInit } from '@angular/core';
import { Utilisateur } from '../Model/Utilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  Utilisateur: Utilisateur = new Utilisateur();
  constructor(private router: Router){ }
ngOnInit(): void {
  this.getroleUser();
  this.getidUser();
}
getroleUser(){
  var rolesUtilisateur=localStorage.getItem('rolesUser');
  return rolesUtilisateur;
}
getidUser(){
  var idUtilisateur=localStorage.getItem('idUser');
  return idUtilisateur;
}
deconnexion() {
  localStorage.removeItem('idUser');
  localStorage.removeItem('rolesUser');
  localStorage.removeItem('NomUser');
  this.router.navigate(['Garage']);
}
}
