import { UserLocation } from './../models/userLocation';
import { SharedDataService } from './shared-data.service';
// import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserLocationService {

  constructor(
    private shared: SharedDataService
  ) { }

  reverseGeolocation(position: any) {
    const c = position.coords;
    // const url = 'https://maps.googleapis.com/maps/api/geocode/json'
    //   + '?latlng=' + c.latitude + ',' + c.longitude
    // this.http
    //   .get(url)
    //   .map((res: Response) => res.json())
    //   .subscribe(data => this.save(c.latitude, c.longitude, data));
  }

  save(latitude: string, longitude: string, data: any) {
    const newLocation: UserLocation = new UserLocation();
    let result: any;
    newLocation.latitude = latitude;
    newLocation.longitude = longitude;
    // if we got something back, get the first result that has a useful type
    if (data && data.results) {
      result = data.results.find(res => res.types.some(type => this.isUseful(type)));
    }
    if (result) {
      newLocation.name = result.formatted_address;
    }
    // Set it into temp and save it to storage
    this.shared.setMyUserLocation(newLocation);
    this.shared.saveMyUserLocation();
  }

  private isUseful(type): boolean {
    // These seem to be what we want
    return (type === 'street_address' ||
      type === 'locality' ||
      type === 'postal_code' ||
      type === 'political' ||
      type === 'country');
  }
}
