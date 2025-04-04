
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule}from '@angular/material/form-field';
import { MatInputModule}from '@angular/material/input';
import { MatButtonModule}from '@angular/material/button';
import { MatCheckboxModule}from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListesvehiculesComponent } from './listesvehicules/listesvehicules.component';
import { AcceuilfinancierComponent } from './acceuilfinancier/acceuilfinancier.component';
import { AcceuilatelierComponent } from './acceuilatelier/acceuilatelier.component';
import { ListesVehiculeDeposerComponent } from './listes-vehicule-deposer/listes-vehicule-deposer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListesreparationsparvehiculeComponent } from './listesreparationsparvehicule/listesreparationsparvehicule.component';
import { ListesreparationsattenteComponent } from './listesreparationsattente/listesreparationsattente.component';
import { ListeVoitureAreparerComponent } from './liste-voiture-areparer/liste-voiture-areparer.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { VehiculereparationpayerComponent } from './vehiculereparationpayer/vehiculereparationpayer.component';
import { PdfDetailsComponent } from './pdf-details/pdf-details.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { NgxPrintModule} from "ngx-print";
import { EnvoyeMailComponent } from './envoye-mail/envoye-mail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepotvoitureComponent } from './depotvoiture/depotvoiture.component';
import { AvancemenreparationsComponent } from './avancemenreparations/avancemenreparations.component';
import { FactureclientComponent } from './factureclient/factureclient.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { ListesvehiculestermineeComponent } from './listesvehiculesterminee/listesvehiculesterminee.component';
import { BondesortieComponent } from './bondesortie/bondesortie.component';
import { ListesvehiculesbondesortievaliderComponent } from './listesvehiculesbondesortievalider/listesvehiculesbondesortievalider.component';
import { RecuperervoitureComponent } from './recuperervoiture/recuperervoiture.component';
import { HistoriquesreparationComponent } from './historiquesreparation/historiquesreparation.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatesComponent } from './states/states.component';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    AcceuilComponent,
    TemplateComponent,
    HeaderComponent,
    FooterComponent,
    ListesvehiculesComponent,
    AcceuilfinancierComponent,
    AcceuilatelierComponent,
    ListesVehiculeDeposerComponent,
    ListesreparationsparvehiculeComponent,
    ListesreparationsattenteComponent,
    ListeVoitureAreparerComponent,
    VehiculereparationpayerComponent,
    PdfDetailsComponent,
    EnvoyeMailComponent,
    DepotvoitureComponent,
    AvancemenreparationsComponent,
    FactureclientComponent,
    HistoriquesComponent,
    ListesvehiculestermineeComponent,
    BondesortieComponent,
    ListesvehiculesbondesortievaliderComponent,
    RecuperervoitureComponent,
    HistoriquesreparationComponent,
    StatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    NgxPaginationModule,
    DragDropModule,
    NgxPrintModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgApexchartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
