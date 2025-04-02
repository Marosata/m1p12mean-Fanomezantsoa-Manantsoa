import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Paiement } from '../Model/Paiement';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { PaiementService } from '../Service/paiement.service';

@Component({
  selector: 'app-acceuilfinancier',
  templateUrl: './acceuilfinancier.component.html',
  styleUrls: ['./acceuilfinancier.component.css'],
})
export class AcceuilfinancierComponent implements OnInit{
  nameFinancier: any;
  ListesPaiementAttente!: Paiement[];
  Vehicule: Vehicule = new Vehicule();
  Utilisateur: Utilisateur = new Utilisateur();
  idVehicule: string = "";
  estPayer: boolean = false;
  pages: number = 1;
  totallength: any;
  totalPrice: any;
  baseUrl = environment.apiUrl;
  constructor(private _snackBar: MatSnackBar,private paiementservice: PaiementService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
  this.nameFinancier = localStorage.getItem('idUser');
  this.getListesVehiculeEnAttente();
  }

  getListesVehiculeEnAttente(){
    this.paiementservice.getReparationVehiculePayerEnAttente()
      .subscribe(
      data => {
        this.ListesPaiementAttente=data;
        this.idVehicule = data[0].vehicule._id;
        if(data[0].vehicule.status==="valide") this.estPayer = true;
        this.totallength= this.ListesPaiementAttente.length;
      })
  }
  getlien(val: string){
    var t=val.split("\\");
    console.log(t[2]);
    return t[2];
  }
  validerpaiement(){
    console.log(this.idVehicule);
    this.paiementservice.ValidationPaiementEnAttente(this.idVehicule).subscribe(
      data=> {
        this._snackBar.open("Payer avec succès", 'Close',{
          duration:500000,
          // css matsnack bar dia any amn style.css ny css anreo
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-alert']
        });
        this.getListesVehiculeEnAttente()
      }
    )
  }
  pageChange(newPage: number){
    this.router.navigate([''],{queryParams: {page: newPage}});
  }
}

