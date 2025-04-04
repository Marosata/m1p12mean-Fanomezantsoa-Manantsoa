import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from '../Model/Reparation';
import { PaiementService } from '../Service/paiement.service';
import { ReparationService } from '../Service/reparation.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-liste-voiture-areparer',
  templateUrl: './liste-voiture-areparer.component.html',
  styleUrls: ['./liste-voiture-areparer.component.css']
})
export class ListeVoitureAreparerComponent {
  nameAtelier: any;
  ListesReparations: Reparation[] = [];
  ListesReparationEncours: Reparation[]=[];
  ListesReparationTerminee: Reparation[]=[];
  ReparationTerminee:Reparation[] =[];
  constructor(private changeDetectorRef: ChangeDetectorRef,private _snackBar: MatSnackBar,private serviceReparation: ReparationService,private paiementservice: PaiementService,private router: Router,private route: ActivatedRoute){
    this.todo = [];
    this.done = [];
  }
  todo!: Reparation[];
  done!: Reparation[];

  ngOnInit(): void {
  this.nameAtelier = localStorage.getItem('idUser');
  this.getListesReparationsAFaire();
  this.getReparationEnCours();
  this.getReparationTerminee();
}
  getListesReparationsAFaire(){
    console.log("vehicule"+this.route.snapshot.paramMap.get('vehicule'))
    this.serviceReparation.getReparationAFaire(this.route.snapshot.paramMap.get('vehicule'))
    .subscribe(
      data => {
        this.ListesReparations=data;
        console.log("data"+ this.ListesReparations);
      }) 
  }
  drop(event: CdkDragDrop<Reparation[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.id === 'cdkDropList-1') {
        this.todo.push(event.previousContainer.data[event.previousIndex]);
          for(let item of this.todo){
            console.log("id"+item._id)
            this.serviceReparation.updateOneReparationEncours(item._id).subscribe(
              (response) => {
              console.log(response);
              this._snackBar.open("Reparation en-cours ✔️✔️ ", 'Close',{
                duration:5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['success-alert']
              });
              this.reloadComponent();
              },
              (error) => {
              // handle the error
              }
              );
          }
        }
      if (event.container.id === 'cdkDropList-2') {
        this.done.push(event.previousContainer.data[event.previousIndex]);
        for(let item of this.done){
          console.log("id"+item._id)
          this.serviceReparation.updateOneReparationTerminee(item._id).subscribe(
            (response) => {
            console.log(response);
            this._snackBar.open(" un typeReparation terminée ✔️✔️ ", 'Close',{
              duration:5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['success-alert']
            });
            this.reloadComponent();
            },
            (error) => {
            // handle the error
            }
            );
        }
      }
      event.previousContainer.data.splice(event.previousIndex,1);
    }
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
  getReparationEnCours(){
    this.serviceReparation.getReparationEnCours(this.route.snapshot.paramMap.get('vehicule'))
    .subscribe(
      data => {
        this.ListesReparationEncours=data;
      }) 
  }
  getReparationTerminee(){
    this.serviceReparation.getReparationTerminee(this.route.snapshot.paramMap.get('vehicule'))
    .subscribe(
      data => {
        this.ListesReparationTerminee=data;
      }) 
  }
  updateVehiculeTerminee(){
    this.serviceReparation.updateVehiculeTerminee(this.route.snapshot.paramMap.get('vehicule'))
    .subscribe(
      (response) => {
      console.log(response);
      this._snackBar.open("toutes les  reparations sont  terminée ✔️✔️ ", 'Close',{
        duration:5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['success-alert']
      });
      },
      (error) => {
      // handle the error
      }
      );
      this.serviceReparation.getReparationTerminee(this.route.snapshot.paramMap.get('vehicule'))
      .subscribe(
        data => {
          this.ReparationTerminee=data;
        }) 
  }
  getlien(val: string){
    var t=val.split("\\");
    console.log(t[2]);
    return t[2];
  }
}