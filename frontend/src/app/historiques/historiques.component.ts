import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Vehicule } from '../Model/vehicule';
import { VehiculeService } from '../Service/vehicule.service';

@Component({
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrls: ['./historiques.component.css']
})
export class HistoriquesComponent implements OnInit{
  Vehicule: Vehicule = new Vehicule();
  pages: number = 1;
  totallength: any;
  vehiculerecuperer!: Vehicule[];
  baseUrl = environment.apiUrl;
  constructor(private _snackBar: MatSnackBar,private servicevehicule: VehiculeService,private router: Router,private route: ActivatedRoute){
   }

  ngOnInit(): void {
    this.Vehicule.utilisateurId=localStorage.getItem('idUser');
    this.getListesVehiculeRecuperer();
    
  }
  
  getListesVehiculeRecuperer(){//listes vehicule à réparer
    this.Vehicule.utilisateurId=localStorage.getItem('idUser');
this.servicevehicule.getHistoriqueVehicules(this.Vehicule.utilisateurId).subscribe(
  data => {
    this.vehiculerecuperer=data;
    console.log(data);
    this.totallength= this.vehiculerecuperer.length;
  }) 
  }
  pageChange(newPage: number){
    this.router.navigate([''],{queryParams: {page: newPage}});
  }
  getlien(val: string){
    var t=val.split("\\");
    console.log(t[2]);
    return t[2];
  } 
}

