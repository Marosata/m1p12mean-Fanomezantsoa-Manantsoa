import { Component } from '@angular/core';

interface Appointment {
  date: string;
  client: string;
  vehicle: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: 'rendezvous.component.html',
styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent {
  displayedColumns: string[] = ['date', 'client', 'vehicle', 'actions'];
  appointments: Appointment[] = [
    { date: '2025-03-20', client: 'John Doe', vehicle: 'Toyota Corolla' },
    { date: '2025-03-21', client: 'Jane Smith', vehicle: 'Honda Civic' },
  ];
}
