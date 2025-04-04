import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicule } from '../Model/vehicule';
import { DepotVoitureService } from '../Service/depot-voiture.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-depotvoiture',
  templateUrl: './depotvoiture.component.html',
  styleUrls: ['./depotvoiture.component.css']
})
export class DepotvoitureComponent implements OnInit{
 
  vehicule: Vehicule = new Vehicule();
  submitted = false;
  Vehicules!: Vehicule[];
  NomUser!: any;
  selectedFile!: File;
  constructor(private _snackBar: MatSnackBar,private depotservice: DepotVoitureService,private router: Router,private route: ActivatedRoute){
   }
  ngOnInit(){
    this.getData();
    this.NomUser = localStorage.getItem('NomUser');
    
  }
getData(){
  let f=localStorage.getItem('idUser');
  //console.log(f);
  //console.log("acceuil");
  return f;
 
}
onFileSelected(event:any) {
  this.selectedFile = <File>event.target.files[0];
}
  async boutonsaveDepot() {
  this.vehicule.utilisateurId=localStorage.getItem('idUser');
    const nom = this.vehicule.nom;
    const type = this.vehicule.type;
    const immatriculation = this.vehicule.immatriculation;
    const image = this.selectedFile;
    const utilisateurId= this.vehicule.utilisateurId;
    (await this.depotservice.depotVoiture(nom, type, image, immatriculation, utilisateurId)).subscribe(
      (response) => {
        console.log(response);
        this._snackBar.open(" insertion vehicule avec succès ✔️✔️ ", 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-alert']
        });
      },
      (error) => {
        // handle the error
        console.log(error)
      });    
  }
}
// boutonsaveDepot() {//action boutton
//   this.submitted = true;
//   this.saveDepotVoiture();    
// }

