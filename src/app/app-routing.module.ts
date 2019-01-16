import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditComponent } from './add-edit/add-edit.component';
// Removed, see README.txt in root project folder:
import { HomeComponent } from './home/home.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { UserLocationComponent } from './user-location/user-location.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'location', component: UserLocationComponent },
  { path: 'add', component: AddEditComponent },
  { path: 'edit/:id', component: AddEditComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

