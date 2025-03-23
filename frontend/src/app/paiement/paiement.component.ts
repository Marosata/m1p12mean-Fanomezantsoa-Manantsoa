import { Component } from '@angular/core';

interface Payment {
  client: string;
  amount: number;
  method: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  displayedColumns: string[] = ['client', 'amount', 'method', 'actions'];
  payments: Payment[] = [
    { client: 'John Doe', amount: 200, method: 'Carte de crédit' },
    { client: 'Jane Smith', amount: 150, method: 'Espèces' },
  ];
}
