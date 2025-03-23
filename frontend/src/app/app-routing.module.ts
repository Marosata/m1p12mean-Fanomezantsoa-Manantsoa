import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { ReparationComponent } from './reparation/reparation.component';
import { EmployeComponent } from './employe/employe.component';
import { PaiementComponent } from './paiement/paiement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rendezvous', component: RendezvousComponent },
  { path: 'reparation', component: ReparationComponent },
  { path: 'employe', component: EmployeComponent },
  { path: 'paiement', component: PaiementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
