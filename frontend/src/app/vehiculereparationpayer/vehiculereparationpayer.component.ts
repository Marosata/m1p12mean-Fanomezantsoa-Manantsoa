import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { PdfDetailsComponent } from '../pdf-details/pdf-details.component';
import { VehiculeService } from '../Service/vehicule.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-vehiculereparationpayer',
  templateUrl: './vehiculereparationpayer.component.html',
  styleUrls: ['./vehiculereparationpayer.component.css']
})
export class VehiculereparationpayerComponent implements OnInit {
  vehiculeValide!: Vehicule[];
  Utilisateur: Utilisateur = new Utilisateur();
  pages: number = 1;
  totallength: any;
  baseUrl = environment.apiUrl;
  constructor( private dialog: MatDialog,private servicevehicule:VehiculeService ,private router: Router) { }

  ngOnInit(): void {
    this.getListesVehiculesValide();
  }
  
  getListesVehiculesValide(){
      this.servicevehicule.getVehiculeReparationPayer()
      .subscribe(
        data => {
          this.vehiculeValide=data;
          this.totallength= this.vehiculeValide.length;
          console.log(data);
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
