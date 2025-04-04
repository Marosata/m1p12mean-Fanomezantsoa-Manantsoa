import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeReparation } from '../Model/TypeReparation';
import { TypeReparationService } from '../Service/type-reparation.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  TypeReparation!: TypeReparation[];
  pages: number = 1;
  totallength: any;
  config: any;
  constructor(private http:HttpClient,private _snackBar: MatSnackBar,private typeReparationservice: TypeReparationService,private router: Router,private route: ActivatedRoute){ 
  }
  pageChange(newPage: number){
    this.router.navigate([''],{queryParams: {page: newPage}});
  }
  ngOnInit(): void{
    this.listReparartion();

  }
  
  listReparartion(): void{//function liste
    this.typeReparationservice.getAllTypeReparation()
      .subscribe(
        data => {
          this.TypeReparation=data;
          this.totallength =   this.TypeReparation.length;
        })
   }
   depotVoiture(){ //redirection le rehefa avy mpototra le icone reparation
    if(!localStorage.getItem("idUser")){
      this._snackBar.open("vous devriez d'abord vous connecter", 'Close',{
        duration:2000,
        // css matsnack bar dia any amn style.css ny css anreo
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['warning-alert']
      });
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/acceuil']);
    }
   }
}
