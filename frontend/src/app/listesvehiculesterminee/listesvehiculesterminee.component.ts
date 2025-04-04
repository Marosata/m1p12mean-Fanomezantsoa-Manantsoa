import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { VehiculeService } from '../Service/vehicule.service';

@Component({
  selector: 'app-listesvehiculesterminee',
  templateUrl: './listesvehiculesterminee.component.html',
  styleUrls: ['./listesvehiculesterminee.component.css'],
})
export class ListesvehiculestermineeComponent {
  vehiculeTerminee!: Vehicule[];
  Utilisateur: Utilisateur = new Utilisateur();
  pages: number = 1;
  totallength: any;
  idVehicule: any;
  baseUrl = environment.apiUrl;
  constructor(
    private servicevehicule: VehiculeService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getListesVehiculesterminee();
  }

  getListesVehiculesterminee() {
    this.servicevehicule.getVehiculeTerminee().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.vehiculeTerminee = data;
          this.idVehicule = data[0]._id;
          this.totallength = this.vehiculeTerminee.length;
          console.log(data);
        } else {
          this.vehiculeTerminee = [];
          console.warn('Aucun véhicule terminé trouvé !');
        }
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des véhicules terminés :',
          error
        );
      }
    );
  }

  getlien(val: string) {
    var t = val.split('\\');
    console.log(t[2]);
    return t[2];
  }
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }
  validerBondeSortie() {
    console.log(this.route.snapshot.paramMap.get('_id'));
    this.servicevehicule.updateStatusVehicule(this.idVehicule).subscribe(
      (response) => {
        console.log(response);
        this._snackBar.open('bon de sortie validé ✔️✔️ ', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-alert'],
        });
      },
      (error) => {
        // handle the error
      }
    );
  }
}
