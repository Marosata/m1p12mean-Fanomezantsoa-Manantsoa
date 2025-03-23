import { Component } from '@angular/core';

interface Employee {
  name: string;
  role: string;
  contact: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: 'employe.component.html',
  styleUrls: ['employe.component.css']
})
export class EmployeComponent {
  displayedColumns: string[] = ['name', 'role', 'contact', 'actions'];
  employees: Employee[] = [
    { name: 'John Doe', role: 'Mécanicien', contact: '123456789' },
    { name: 'Jane Smith', role: 'Réceptionniste', contact: '987654321' },
  ];
}
