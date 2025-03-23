import { Component } from '@angular/core';

interface Repair {
  vehicle: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-repairs',
  templateUrl: 'reparation.component.html',
  styleUrls: ['./reparation.component.css']
})
export class ReparationComponent {
  displayedColumns: string[] = ['vehicle', 'type', 'status', 'actions'];
  repairs: Repair[] = [
    { vehicle: 'Toyota Corolla', type: 'Vidange', status: 'En cours' },
    { vehicle: 'Honda Civic', type: 'Changement de pneus', status: 'Terminé' },
  ];
}
