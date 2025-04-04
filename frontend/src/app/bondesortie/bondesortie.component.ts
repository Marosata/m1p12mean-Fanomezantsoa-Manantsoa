import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from '../Model/Reparation';
import { TypeReparation } from '../Model/TypeReparation';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { ReparationService } from '../Service/reparation.service';

@Component({
  selector: 'app-bondesortie',
  templateUrl: './bondesortie.component.html',
  styleUrls: ['./bondesortie.component.css']
})
export class BondesortieComponent {

  AllReparation!: Reparation[];
  TypeReparation: TypeReparation = new TypeReparation();
  totalPrice: any;
  Utilisateur: Utilisateur = new Utilisateur();
  Vehicule: Vehicule = new Vehicule();
  constructor(private serviceReparation: ReparationService,private router: Router,private route: ActivatedRoute){
  }
ngOnInit(): void {
  this.getBondeCommandeParVoiture();
}
getBondeCommandeParVoiture(){
  this.Vehicule.utilisateurId=localStorage.getItem('idUser');
  this.serviceReparation.getBondeSortieParVoiture(this.Vehicule.utilisateurId,this.route.snapshot.paramMap.get('id'))
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
