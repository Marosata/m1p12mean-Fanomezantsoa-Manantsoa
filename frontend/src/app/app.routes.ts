import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { VehiculeCreateComponent } from './pages/listes_vehicules/vehicule-create.component';
import { ClientGuard } from '../service/guard/client.guard';
import { VehiculeListComponent } from './pages/listes_vehicules/vehicule-list.component';
import { AtelierFinancierGuard } from '../service/guard/atelier-financier.guard';
import { VehiculeStatsComponent } from './pages/listes_vehicules/vehicule-stats.component';
import { ResponsableFinancierGuard } from '../service/guard/responsable-financier.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inscription', component: AuthComponent  },
    { 
        path: 'vehicule/create',
        component: VehiculeCreateComponent,
        canActivate: [ClientGuard] 
    },
    { 
        path: 'vehicules',
        component: VehiculeListComponent,
        canActivate: [AtelierFinancierGuard] 
    },
    { 
        path: 'stats',
        component: VehiculeStatsComponent,
        canActivate: [ResponsableFinancierGuard] 
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
