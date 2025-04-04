import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Reparation } from '../Model/Reparation';
import { Vehicule } from '../Model/vehicule';
import { DepotVoitureService } from '../Service/depot-voiture.service';
import { ReparationService } from '../Service/reparation.service';

@Component({
  selector: 'app-listes-vehicule-deposer',
  templateUrl: './listes-vehicule-deposer.component.html',
  styleUrls: ['./listes-vehicule-deposer.component.css']
})
export class ListesVehiculeDeposerComponent {
  Reparation: Reparation = new Reparation();
  listeReparation!: Reparation[];
  Vehicule: Vehicule = new Vehicule();
  displayStyle = "none";
  ReparationById!: Reparation[];
  pages: number = 1;
  totallength: any;
  totalPrice: any;
  config: any;
  VehiculeReparer!: Vehicule[];
  baseUrl = environment.apiUrl;
  constructor(private reparationservice: ReparationService, private depotVoitureService: DepotVoitureService,private router: Router,private route: ActivatedRoute){
   }

  ngOnInit(): void {
    this.Vehicule.utilisateurId=localStorage.getItem('idUser');
    this.listesVehiculesDeposer();
    this.listeVehiculeParUtilisateur();
    
  }
  pageChange(newPage: number){
    this.router.navigate([''],{queryParams: {page: newPage}});
  }
  listeVehiculeParUtilisateur(){//listes vehicules user izay ho atao reparation
    this.Vehicule.utilisateurId=localStorage.getItem('idUser');
this.reparationservice.getListeVehiculeDeposer(this.Vehicule.utilisateurId).subscribe(
  data => {
    this.VehiculeReparer=data;
    console.log(data);
  }) 
  }
  
  listesVehiculesDeposer(){
      this.Vehicule.utilisateurId=localStorage.getItem('idUser');
      this.reparationservice.getListeVoituresDeposer(this.Vehicule.utilisateurId)
      .subscribe(
        data => {
          this.listeReparation=data;
          this.totallength= this.listeReparation.length;
          this.totalPrice =  this.listeReparation.map(a => a.typeReparation.prixReparation).reduce(function(a, b)
          {
             return a + b;
          });
          console.log( this.totalPrice )
          console.log(data);
        }) 
  }
  getlien(val: string){
    var t=val.split("\\");
    console.log(t[2]);
    return t[2];
  }
  openPopup(_id:any) {
    this.depotVoitureService.getListeReparationByReparation(_id)
      .subscribe(
        data => {
          this.listeReparation=data;
          console.log(data);
        }) 
    this.displayStyle = "block";
    this.listesVehiculesDeposer()
  }
  closePopup() {
    this.displayStyle = "none";
  }
  confirme(_id:string){
  console.log(_id);
  this.depotVoitureService.deleteReparation(_id)
  .subscribe(
    data => {
      this.listesVehiculesDeposer();
      this.closePopup();
      console.log(data);
    }) 
}}