import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotVoitureService } from '../Service/depot-voiture.service';
import { Reparation } from '../Model/Reparation';
import { Vehicule } from '../Model/vehicule';
import { PaiementService } from '../Service/paiement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listesreparationsparvehicule',
  templateUrl: './listesreparationsparvehicule.component.html',
  styleUrls: ['./listesreparationsparvehicule.component.css']
})
export class ListesreparationsparvehiculeComponent implements OnInit {
  Vehicule: Vehicule = new Vehicule();
  AllReparation!: Reparation[];
  OneReparation!: Reparation[];
  displayStyle = "none";
  pages: number = 1;
  totallength: any;
  totalPrice: any;
  idVehicule: string = "";
  estPayer: boolean = false;
  constructor(private _snackBar: MatSnackBar,private depotVoitureService: DepotVoitureService,private router: Router,private route: ActivatedRoute, private paiementService: PaiementService){
  }
ngOnInit(): void {
  this.getListesReparationsParVehicule();
}
getListesReparationsParVehicule(){
  this.Vehicule.utilisateurId=localStorage.getItem('idUser');
  this.depotVoitureService.getListeReparationParVehicule(this.Vehicule.utilisateurId,this.route.snapshot.paramMap.get('id'))
  .subscribe(
    data => {
      this.AllReparation=data;
      this.OneReparation = data;
      this.idVehicule=data[0].vehicule._id;
      if(data[0].vehicule.status==="en attente") this.estPayer = true
      this.totallength= this.AllReparation.length;
          this.totalPrice =  this.AllReparation.map(a => a.typeReparation.prixReparation).reduce(function(a, b)
          {
             return a + b;
          });
          console.log( this.totalPrice )
          console.log(data); 
    }) 
}
pageChange(newPage: number){
  this.router.navigate([''],{queryParams: {page: newPage}});
}
openPopup(_id:any) {
  console.log("idd"+_id)
  this.depotVoitureService.getListeReparationByReparation(_id)
  
    .subscribe(
      data => {
        this.OneReparation=data;
        console.log(data);
      }) 
  this.displayStyle = "block";
  this.ngOnInit();
}
closePopup() {
  this.displayStyle = "none";
}
confirme(_id:string){
console.log(_id); 
this.depotVoitureService.deleteReparation(_id)
.subscribe(
  data => {
    this.getListesReparationsParVehicule();
    this.closePopup();
    console.log(data);
  }) 
}

procederpaiement(){
  console.log(this.idVehicule);
  console.log(this.totalPrice);
  this.paiementService.ValidationPaiement(this.idVehicule, this.totalPrice).subscribe(
    data=> {
      this._snackBar.open("Payer avec succès", 'Close',{
        duration:500000,
        // css matsnack bar dia any amn style.css ny css anreo
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['success-alert']
      });
      this.getListesReparationsParVehicule()
    }
  )
}

}
