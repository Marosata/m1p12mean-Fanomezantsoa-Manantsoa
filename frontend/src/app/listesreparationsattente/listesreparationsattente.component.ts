import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from '../Model/Reparation';
import { TypeReparation } from '../Model/TypeReparation';
import { ReparationService } from '../Service/reparation.service';

@Component({
  selector: 'app-listesreparationsattente',
  templateUrl: './listesreparationsattente.component.html',
  styleUrls: ['./listesreparationsattente.component.css']
})
export class ListesreparationsattenteComponent implements OnInit {
  ListesReparations!: Reparation[];
  TypeReparation: TypeReparation = new TypeReparation();
  
  constructor(private serviceReparation: ReparationService,private router: Router,private route: ActivatedRoute){
  }
ngOnInit(): void {
  this.getListesReparationsParVehicule();
}
getListesReparationsParVehicule(){
  
  this.serviceReparation.getListesReparationsByVehicule(this.route.snapshot.paramMap.get('id'))
  .subscribe(
    data => {
      this.ListesReparations=data;
      
    }) 
}


}
