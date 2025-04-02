import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paiement } from '../Model/Paiement';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { PaiementService } from '../Service/paiement.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-accueilmecanicien',
  templateUrl: "./accueilmecanicien.component.html",
  styleUrls: ['./accueilmecanicien.component.css']
})
export class AcceuilatelierComponent {
  nameAtelier: any;
  ListesPaiementValider!: Paiement[];
  Vehicule: Vehicule = new Vehicule();
  Utilisateur: Utilisateur = new Utilisateur();
  pages: number = 1;
  totallength: any;
  totalPrice: any;
  baseUrl = environment.apiUrl;
  constructor(private paiementservice: PaiementService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
  this.nameAtelier = localStorage.getItem('idUser');
  this.getListesVehiculeValider();
  }

  getListesVehiculeValider(){
    this.paiementservice.getListeVoitureValider()
      .subscribe(
      data => {
        this.ListesPaiementValider=data;
        this.totallength= this.ListesPaiementValider.length;
      })
  }
  getlien(val: string){
    var t=val.split("\\");
    console.log(t[2]);
    return t[2];
  }
  pageChange(newPage: number){
    this.router.navigate([''],{queryParams: {page: newPage}});
  }
}
