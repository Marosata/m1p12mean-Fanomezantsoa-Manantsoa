import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../Model/Utilisateur';
import { Vehicule } from '../Model/vehicule';
import { VehiculeService } from '../Service/vehicule.service';

@Component({
  selector: 'app-listesvehiculesbondesortievalider',
  templateUrl: './listesvehiculesbondesortievalider.component.html',
  styleUrls: ['./listesvehiculesbondesortievalider.component.css']
})
export class ListesvehiculesbondesortievaliderComponent {
  vehiculeSortieValider!: Vehicule[];
  Utilisateur: Utilisateur = new Utilisateur();
  pages: number = 1;
  totallength: any;
  baseUrl = environment.apiUrl;
  constructor(private servicevehicule:VehiculeService ,private router: Router) { }

  ngOnInit(): void {
    this.getListesVehiculeBondeSortieValider();
  }
  
  getListesVehiculeBondeSortieValider(){
      this.servicevehicule.getVoitureBondeSortieValider()
      .subscribe(
        data => {
          this.vehiculeSortieValider=data;
          this.totallength= this.vehiculeSortieValider.length;
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