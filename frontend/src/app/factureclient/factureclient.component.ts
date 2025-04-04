import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from '../Model/Reparation';
import { TypeReparation } from '../Model/TypeReparation';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { ReparationService } from '../Service/reparation.service';

@Component({
  selector: 'app-factureclient',
  templateUrl: './factureclient.component.html',
  styleUrls: ['./factureclient.component.css']
})
export class FactureclientComponent implements OnInit{
  AllReparation!: Reparation[];
  TypeReparation: TypeReparation = new TypeReparation();
  totalPrice: any;
  Utilisateur: Utilisateur = new Utilisateur();
  Vehicule: Vehicule = new Vehicule();
  constructor(private serviceReparation: ReparationService,private router: Router,private route: ActivatedRoute){
  }
ngOnInit(): void {
  this.getFacture();
}
getFacture(){
  this.Vehicule.utilisateurId=localStorage.getItem('idUser');
  this.serviceReparation.getFactureClient(this.Vehicule.utilisateurId,this.route.snapshot.paramMap.get('id'))
  .subscribe(
    data => {
      this.AllReparation=data;
      this.totalPrice =  this.AllReparation.map(a => a.typeReparation.prixReparation).reduce(function(a, b)
      {
         return a + b;
      });
      console.log("nom :" + this.AllReparation[0].vehicule.utilisateur.nom);
    }) 
}

}
