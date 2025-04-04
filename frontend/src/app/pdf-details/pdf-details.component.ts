import { Component } from '@angular/core';
import{MatIconModule}from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from '../Model/Reparation';
import { TypeReparation } from '../Model/TypeReparation';
import { Utilisateur } from '../Model/Utilisateur';
import { ReparationService } from '../Service/reparation.service';
@Component({
  selector: 'app-pdf-details',
  templateUrl: './pdf-details.component.html',
  styleUrls: ['./pdf-details.component.css']
})
export class PdfDetailsComponent {
  ListesReparations!: Reparation[];
  TypeReparation: TypeReparation = new TypeReparation();
  totalPrice: any;
  Utilisateur: Utilisateur = new Utilisateur();
  constructor(private serviceReparation: ReparationService,private router: Router,private route: ActivatedRoute){
  }
ngOnInit(): void {
  this.getListesReparationsParVehicule();
}
getListesReparationsParVehicule(){
  
  this.serviceReparation.getListesReparationsByVehicule(this.route.snapshot.paramMap.get('id'))
  .subscribe(
    data => {
      this.ListesReparations=data;
      this.totalPrice =  this.ListesReparations.map(a => a.typeReparation.prixReparation).reduce(function(a, b)
      {
         return a + b;
      });
      console.log("nom :" + this.ListesReparations[0].vehicule.utilisateur.nom);
    }) 
}
}