import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  makes: Make[];
  makesSubscription: Subscription;
  models: string[];
  validYears: number[];

  constructor(private vehicleService: VehicleFinderService,
    public shared: SharedDataService) {
  }

  ngOnInit() {
    this.validYears = this.vehicleService.validYears();
    this.tempVehicle = this.shared.getMyVehicle();
    console.log('I got', this.tempVehicle);
    this.refreshDropdownData();
  }

  refreshDropdownData() {
    console.log('refreshing', this.tempVehicle);
    if (!this.tempVehicle.make) {
      this.makes = this.vehicleService.getMakes(this.tempVehicle.year);
    } else if (!this.tempVehicle.model) {
      this.models = this.vehicleService.getModels(this.tempVehicle.make, this.tempVehicle.year);
    }
  }

  selectedMake() {
    console.log('selectedMake', this.makes, this.tempVehicle.make.name);

    this.tempVehicle.make = this.makes.find((make) => make.name === this.tempVehicle.make.name);
    this.refreshDropdownData();
  }

  save() {
    this.shared.setMyVehicle(this.tempVehicle);
    this.shared.saveMyVehicle();
  }

  clear() {
    console.log('clear');

    this.tempVehicle.make = this.tempVehicle.model = this.tempVehicle.color = this.tempVehicle.year = null;
    this.shared.clearMyVehicle();
  }
}
