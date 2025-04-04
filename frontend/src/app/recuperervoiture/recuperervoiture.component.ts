import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Vehicule } from '../Model/vehicule';
import { VehiculeService } from '../Service/vehicule.service';

@Component({
  selector: 'app-recuperervoiture',
  templateUrl: './recuperervoiture.component.html',
  styleUrls: ['./recuperervoiture.component.css']
})
export class RecuperervoitureComponent implements OnInit{
    Vehicule: Vehicule = new Vehicule;
    pages: number = 1;
    totallength: any;
    ListesVehicule!: Vehicule[];
    idVehicule: any;
    baseUrl = environment.apiUrl;
    constructor(private _snackBar: MatSnackBar,private servicevehicule: VehiculeService,private router: Router,private route: ActivatedRoute){
     }
  
    ngOnInit(): void {
      this.Vehicule.utilisateurId=localStorage.getItem('idUser');
      this.getListesVehiculeRecuperer();
      
    }
    
    getListesVehiculeRecuperer(){//listes vehicule à réparer
      this.Vehicule.utilisateurId=localStorage.getItem('idUser');
      console.log(this.Vehicule.utilisateurId)
  this.servicevehicule.getListesVehiculeRecuperer(this.Vehicule.utilisateurId).subscribe(
    data => {
      this.ListesVehicule=data;
      console.log(data);
      this.idVehicule = data[0]._id;
      this.totallength= this.ListesVehicule.length;
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
    validerRecuperationVoiture(){
      console.log(this.route.snapshot.paramMap.get('_id'))
      this.servicevehicule.updateStatusVehiculeRecuperer(this.idVehicule).subscribe(
        (response) => {
        console.log(response);
        this._snackBar.open("Voiture récupérer ✔️✔️ ", 'Close',{
          duration:5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-alert']
        });
        this.getListesVehiculeRecuperer();
        },
        (error) => {
        // handle the error
        }
        );
        
    } 
  }
