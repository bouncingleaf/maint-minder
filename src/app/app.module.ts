import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';

/* App root */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Feature components */
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddEditTasksComponent } from './add-edit/add-edit-tasks.component';
import { AddEditNotesComponent } from './add-edit/add-edit-notes.component';
// Removed, see README.txt in root project folder:
// import { AddEditAttachmentsComponent } from './add-edit/add-edit-attachments.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HomeEventListComponent } from './home/home-event-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { UserLocationComponent } from './user-location/user-location.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsFavoritesComponent } from './settings/settings-favorites.component';

/* Services */
import { SharedDataService } from './services/shared-data.service';
import { StorageService } from './services/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent,
    AddEditTasksComponent,
    AddEditNotesComponent,
    // Removed, see README.txt in root project folder:
    // AddEditAttachmentsComponent,
    HeaderComponent,
    HomeComponent,
    HomeEventListComponent,
    VehicleComponent,
    UserLocationComponent,
    SettingsComponent,
    SettingsFavoritesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ClarityModule,
  ],
  providers: [SharedDataService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
