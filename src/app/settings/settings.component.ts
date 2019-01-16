import { SharedDataService } from './../services/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  constructor(public shared: SharedDataService) { }

  ngOnInit() {
  }

}
