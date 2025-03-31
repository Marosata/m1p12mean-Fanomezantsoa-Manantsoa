// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  userName: string | null = '';

  ngOnInit(): void {
    // Par exemple, récupérer le nom d'utilisateur depuis le localStorage ou un service
    this.userName = localStorage.getItem('userName') || 'Utilisateur';
  }
}
