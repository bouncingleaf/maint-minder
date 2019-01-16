import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Vehicle } from './../models/vehicle';
import { Make } from './../models/make';

import { SharedDataService } from './../services/shared-data.service';
import { VehicleFinderService } from './../services/vehicle-finder.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  providers: [VehicleFinderService]
})
export class VehicleComponent implements OnInit {
  tempVehicle: Vehicle;
  tempVehicleMakeName: string;
  makes: Make[];
  models: string[];
  validYears: number[];

  constructor(private vehicleService: VehicleFinderService,
    public shared: SharedDataService) {
  }

  ngOnInit() {
    this.validYears = this.vehicleService.validYears();
    this.tempVehicle = this.shared.getMyVehicle();
    this.refreshDropdownData();
  }

  refreshDropdownData() {
    if (!this.tempVehicle.make) {
      this.makes = this.vehicleService.getMakes(this.tempVehicle.year);
    } else if (!this.tempVehicle.model) {
      this.models = this.vehicleService.getModels(this.tempVehicle.make, this.tempVehicle.year);
    }
  }

  selectedMake() {
    this.tempVehicle.make = this.makes.find((make) => make.name === this.tempVehicleMakeName);
    this.refreshDropdownData();
  }

  save() {
    this.shared.setMyVehicle(this.tempVehicle);
    this.shared.saveMyVehicle();
  }

  clear() {
    this.tempVehicleMakeName = null;
    this.tempVehicle.make = this.tempVehicle.model = this.tempVehicle.color = this.tempVehicle.year = null;
    this.shared.clearMyVehicle();
  }
}
