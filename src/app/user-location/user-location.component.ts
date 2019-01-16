import { UserLocationService } from './../services/user-location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  providers: [UserLocationService]
})
export class UserLocationComponent implements OnInit {

  constructor(private userLoc: UserLocationService) { }

  ngOnInit() {
  }

  canUseGeolocation(): boolean {
    if (navigator.geolocation) {
      return true;
    } else {
      console.log('no geolocation');
      return false;
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((results) => this.savePosition(results));
    }
  }

  savePosition(position: any) {
    console.log(position);
    this.userLoc.reverseGeolocation(position);
  }

}
