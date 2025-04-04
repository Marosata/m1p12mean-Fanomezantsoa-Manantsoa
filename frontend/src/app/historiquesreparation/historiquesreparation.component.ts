import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from '../Model/Reparation';
import { Vehicule } from '../Model/vehicule';
import { ReparationService } from '../Service/reparation.service';

@Component({
  selector: 'app-historiquesreparation',
  templateUrl: './historiquesreparation.component.html',
  styleUrls: ['./historiquesreparation.component.css']
})
export class HistoriquesreparationComponent implements OnInit{
  Vehicule: Vehicule = new Vehicule;
  pages: number = 1;
  totallength: any;
  allreparations!: Reparation[];
  constructor(private _snackBar: MatSnackBar,private ReparationService: ReparationService,private router: Router,private route: ActivatedRoute){
   }

  ngOnInit(): void {
    this.Vehicule.utilisateurId=localStorage.getItem('idUser');
    this.getListesVehiculeRecuperer();
    
  }
  
  getListesVehiculeRecuperer(){//listes vehicule à réparer
    this.Vehicule.utilisateurId=localStorage.getItem('idUser');
this.ReparationService.getHistoriquesReparations(this.Vehicule.utilisateurId,this.route.snapshot.paramMap.get('id')).subscribe(
  data => {
    this.allreparations=data;
    console.log(data);
    this.totallength= this.allreparations.length;
  }) 
  }
  pageChange(newPage: number){
    this.router.navigate([''],{queryParams: {page: newPage}});
  }
  

}
