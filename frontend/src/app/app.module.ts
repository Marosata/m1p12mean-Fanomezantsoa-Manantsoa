
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
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { NgxPrintModule} from "ngx-print";
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AcceuilComponent } from './accueil/accueil.component';
import { AcceuilfinancierComponent } from './accueilmanager/acceuilfinancier.component';
import { AcceuilatelierComponent } from './accueilmecanicien/accueilmecanicien.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@NgModule({ 
  declarations: [
    AppComponent,
    AcceuilComponent,
    AcceuilfinancierComponent,
    AcceuilatelierComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
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
